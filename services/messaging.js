import { db } from '../firebase'
import { doc, getDoc, setDoc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore'

export const DEFAULT_GROUP_ID = 'default'
export const DEFAULT_GROUP_NAME = 'Roomies 2025'


export const getDmChannelId = (uid1, uid2) => {
  const sortedIds = [uid1, uid2].sort() 
  return `dm_${sortedIds[0]}_${sortedIds[1]}`
}

export const getGroupChannelId = (groupId) => `group_${groupId}`

// checks if the group chat room exists and creates it if not

async function ensureGroupChannel(groupId, participantIds) {
  const channelRef = doc(db, 'channels', getGroupChannelId(groupId))
  const snap = await getDoc(channelRef)

  if (!snap.exists()) {
    // creates new chat room 
    await setDoc(channelRef, {
      type: 'group',
      participantIds: participantIds,
      name: 'Group Chat',
      createdAt: serverTimestamp()
    })
  } else {
    // updates the list of people in the room
    await updateDoc(channelRef, { participantIds })
  }
}


// checks if a dm chat exists between two people
async function ensureDmChannel(uid1, uid2) {
  const channelId = getDmChannelId(uid1, uid2)
  const channelRef = doc(db, 'channels', channelId)
  const snap = await getDoc(channelRef)

  if (!snap.exists()) {
    await setDoc(channelRef, {
      type: 'dm',
      participantIds: [uid1, uid2].sort(),
      createdAt: serverTimestamp()
    })
  }
}

// new user
export async function joinDefaultGroup(uid) {
  // references documents
  const groupRef = doc(db, 'groups', DEFAULT_GROUP_ID)
  const userRef = doc(db, 'users', uid)

  // adds user to group
  const groupSnap = await getDoc(groupRef)
  
  if (!groupSnap.exists()) {
    // if group doesn't exist yet, creates it with this user
    await setDoc(groupRef, {
      name: DEFAULT_GROUP_NAME,
      memberIds: [uid]
    })
  } else {
    // if it exists, adds the user to the array
    await updateDoc(groupRef, {
      memberIds: arrayUnion(uid)
    })
  }
  await updateDoc(userRef, { groupId: DEFAULT_GROUP_ID })

  // sets up the chats
  const updatedGroup = await getDoc(groupRef)
  const allMemberIds = updatedGroup.data()?.memberIds || [uid]

  // sets up the main group chat
  await ensureGroupChannel(DEFAULT_GROUP_ID, allMemberIds)

  // sets up DMs with everyone else in the group
  const otherMembers = allMemberIds.filter(id => id !== uid)
  for (const otherId of otherMembers) {
    await ensureDmChannel(uid, otherId)
  }

  return DEFAULT_GROUP_ID
}
