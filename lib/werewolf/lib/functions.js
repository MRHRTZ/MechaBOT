const fs = require('fs')
const {
     LobbyMaker
} = require('matchmaking');

const config = JSON.parse(fs.readFileSync('../src/config.json')) 

const lobbyMainPath = __dirname + '/../src/db/mainLobby.json'
let mainLobby = JSON.parse(fs.readFileSync(lobbyMainPath))

const UserMainPath = __dirname + '/../src/db/players.json'
let mainPlayers = JSON.parse(fs.readFileSync(UserMainPath))

function pushFile(path, json) {
     fs.writeFileSync(path, JSON.stringify(json, null, 2))
}

function runGame(players) {
     console.log("Game started with:");
     console.log(players);
}

function getPlayerKey(player) {
     return player.id;
}

function newRoom(roomName, jid, password = false) {
     if (!roomName) return { status: false, message: 'Masukan Nama Room!' }
     if (!jid) return { status: false, message: 'Masukan Nomer ID!' }
     let playersList = []
     for (let num of mainPlayers) {
          playersList.push(num.jid)
     }
     const indexJid = playersList.indexOf(jid)
     if (indexJid == -1) {
          return { status: false, message: 'Nomor anda belum terdaftar pada game ini.' }
     } else {
          // let lobby = new LobbyMaker({}, getPlayerKey);
          const rid = mainLobby.length + 1
          for (let rlist of mainLobby) {
               if (rlist.data.name === roomName) return { status: false, message: 'Nama Room Telah dipakai!'}
               if (rlist.leader === jid) return { status: false, message: 'Anda tidak bisa membuat room karena telah mempunyai room ' + rlist.data.name }
          }
          // let id = lobby.createRoom({ id: mainPlayers[indexJid].pid, username: mainPlayers[indexJid].username}, roomName, {
          //      minLobbySize: 4,
          //      maxLobbySize: 8
          // });
          let id = {
               name: roomName,
               passwordIsRequired: password,
               password: '',
               currentPlayers: 1,
               minPlayers: config.MinimumPlayers,
               maxPlayers: config.MaximumPlayers
             }
          const rdata = id
          mainLobby.push({ status: true, gstatus: 'waiting', rid: rid, leader: jid, leader_name: mainPlayers[indexJid].username, data: rdata, players: [{ jid: jid, username: mainPlayers[indexJid].username }] })
          mainPlayers[indexJid].onRoom = roomName
          pushFile(UserMainPath, mainPlayers)
          pushFile(lobbyMainPath, mainLobby)
          return { status: true, gstatus: 'waiting', rid: rid, leader: jid, leader_name: mainPlayers[indexJid].username, data: rdata, players: [{ jid: jid, username: mainPlayers[indexJid].username }] }
     }
}

function deleteRoom(jid_leader) {
     if (!jid_leader) return { status: false, message: 'Masukan Nomer ID!' }
     let playersList = []
     for (let num of mainPlayers) {
          playersList.push(num.jid)
     }
     const indexJid = playersList.indexOf(jid_leader)
     if (indexJid == -1) {
          return { status: false, message: 'Nomor anda belum terdaftar pada game ini.' }
     } else {
          let jidList = []
          for (let rlist of mainLobby) {
               jidList.push(rlist.leader)
          }
          if (!jidList.includes(jid_leader)) return { status: false, message: 'Anda tidak bisa menghapus grup ini karena bukan room leader atau mungkin room sudah terhapus.' }
          const rindex = jidList.indexOf(jid_leader)
          if (mainLobby[rindex].leader) {
               nameRoomDeleted = mainLobby[rindex].data.name
               mainLobby.splice(rindex, 1)
               for (let rList of mainPlayers) {
                    if (rList.onRoom == nameRoomDeleted) {
                         rList.onRoom = null
                    }
               }
               pushFile(UserMainPath, mainPlayers)
               pushFile(lobbyMainPath, mainLobby)
               return { status: true, message: 'Room ' + nameRoomDeleted + ' Telah dihapus.' }
          }
     } 
}


function joinRoom(roomName, jid) {
     if (!roomName) return { status: false, message: 'Masukan Nama Room!' }
     if (!jid) return { status: false, message: 'Masukan Nomer ID!' }
     let playersList = []
     for (let num of mainPlayers) {
          playersList.push(num.jid)
     }
     const indexJid = playersList.indexOf(jid)
     if (indexJid == -1) {
          return { status: false, message: 'Nomor anda belum terdaftar pada game ini.' }
     } else {
          for (let rlist of mainLobby) {
               if (rlist.leader === jid) return { status: false, message: 'Anda tidak bisa memasuki room karena telah mempunyai room ' + rlist.data.name }
               if (mainPlayers[indexJid].onRoom != null) return { status: false, message: 'Gagal join, karena anda sudah memasuki room ' + rlist.data.name }
               if (rlist.data.name != roomName) {
                    return { status: false, message: 'Mohon maaf room sudah tidak ada.' }
               } else {
                    rlist.players.push({ jid: jid, username: mainPlayers[indexJid].username })
                    rlist.data.currentPlayers = rlist.data.currentPlayers + 1
                    mainPlayers[indexJid].onRoom = roomName
                    pushFile(UserMainPath, mainPlayers)
                    pushFile(lobbyMainPath, mainLobby)
                    return rlist
               }
          }
     }
}

function leaveRoom(jid) {
     if (!jid) return { status: false, message: 'Masukan Nomer ID!' }
     let playersList = []
     for (let num of mainPlayers) {
          playersList.push(num.jid)
     }
     const indexJid = playersList.indexOf(jid)
     if (indexJid == -1) {
          return { status: false, message: 'Nomor anda belum terdaftar pada game ini.' }
     } else {
          let rNames = []
          let rLead = []
          for (let rlist of mainLobby) {
              rNames.push(rlist.data.name)
              rNames.push(rlist.leader)
          }
          const onRoom = mainPlayers[indexJid].onRoom 
          if (onRoom == null) return { status: false, message: 'Anda tidak bisa keluar karena tidak memasuki room manapun.' }
          const indexRoom = rNames.indexOf(onRoom)
          if (rLead.includes(jid)) {
               mainLobby.splice(indexRoom, 1)
               mainPlayers[indexJid].onRoom = null
               pushFile(UserMainPath, mainPlayers)
               pushFile(lobbyMainPath, mainLobby)
               return { status: true, message: 'Berhasil keluar room ' + rNames[indexRoom] + ' dan room telah dihancurkan.' }
          } else {
               let ListedPlayersOnRoom = []
               for (let list of mainLobby[indexRoom].players) {
                    ListedPlayersOnRoom.push(list)
               }
               const indexPOR = ListedPlayersOnRoom.indexOf(jid)
               mainLobby[indexRoom].players.splice(indexPOR, 1)
               mainPlayers[indexJid].onRoom = null
               pushFile(UserMainPath, mainPlayers)
               pushFile(lobbyMainPath, mainLobby)
               return { status: true, message: 'Berhasil keluar room ' + rNames[indexRoom] + '.' }
          }
          
     }
}

// const hapusRoom = deleteRoom('6285559038021@s.whatsapp.net')
const buatRoom = newRoom('Merhas', '6285559038021@s.whatsapp.net')
// const join = joinRoom('Merhas', '1@s.whatsapp.net')
// const leave = leaveRoom('6285559038021@s.whatsapp.net')

console.log(buatRoom) 




// const roomName = 'MRHZ'



// function getPlayerKey(player) {
//      return player.id;
// }

// let lobby = new LobbyMaker(runGame, getPlayerKey);

// let player1 = {
//      id: 20
// }
// let player2 = {
//      id: 21
// }

// Create a room
// let id = lobby.createRoom(player1, 'Contoh', {
//      minLobbySize: 4,
//      maxLobbySize: 8
// });

// let ids = lobby.createRoom(player2, 'Contoh2', {
//      minLobbySize: 4,
//      maxLobbySize: 8
// });

// lobby.createRoom({ id: 522 }, roomName + '2', {
//      minLobbySize: 4,
//      maxLobbySize: 8
// });

// mainLobby = lobby.listRooms()
// mainLobby[0].tayo = 'yea'
// fs.writeFileSync(lobbyMainPath, JSON.stringify(mainLobby, null, 2))

// A player joined the room!
// lobby.joinRoom(id, player2);
// lobby.joinRoom(id, {
//      id: 24
// });
//    lobby.joinRoom(id, { id: 54 });

// for (let metaRoom of lobby.listRooms()) {
//      if (metaRoom.id == id) {
//           if (metaRoom.currentPlayers < 4) {
//                console.log(`${metaRoom.currentPlayers}/8 Players\n\nMin 4`)
//           }
//      }
// }

// Lets start the game
// lobby.startGame(id);

// console.log(lobby.listRooms())