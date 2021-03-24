const fs = require("fs");
const { LobbyMaker } = require("matchmaking");

const config = JSON.parse(fs.readFileSync("../src/config.json"));

const lobbyMainPath = __dirname + "/../src/db/mainLobby.json";
let mainLobby = JSON.parse(fs.readFileSync(lobbyMainPath));

const UserMainPath = __dirname + "/../src/db/players.json";
let mainPlayers = JSON.parse(fs.readFileSync(UserMainPath));

const GamePlayPath = __dirname + "/../src/db/gameplay.json";
let gameplay = JSON.parse(fs.readFileSync(GamePlayPath))

async function pushFile(path, json) {
     fs.writeFileSync(path, JSON.stringify(json, null, 2));
}

function shuffle(array) {
     var currentIndex = array.length, temporaryValue, randomIndex;

     // While there remain elements to shuffle...
     while (0 !== currentIndex) {

          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
     }

     return array;
}

/**
 * Membuat Room baru
 *
 * @param {string} roomName Nama room yang akan dibuat.
 * @param {string} jid Nomer ID WhatsApp
 * @param {string} password Masukan password (optional).
 */
function newRoom(roomName, jid, password = false) {
     if (!roomName)
          return {
               status: false,
               message: "Masukan Nama Room!",
          };
     if (!jid)
          return {
               status: false,
               message: "Masukan Nomer ID!",
          };
     jid = !jid.includes("@s.whatsapp.net") ? jid + "@s.whatsapp.net" : jid
     let playersList = [];
     for (let num of mainPlayers) {
          playersList.push(num.jid);
     }
     const indexJid = playersList.indexOf(jid);
     if (indexJid == -1) {
          return {
               status: false,
               message: "Nomor kamu belum terdaftar pada game ini.",
          };
     } else {
          const rid = mainLobby.length + 1;
          for (let rlist of mainLobby) {
               if (rlist.data.name === roomName)
                    return {
                         status: false,
                         message: "Nama Room Telah dipakai!",
                    };
               if (rlist.leader === jid)
                    return {
                         status: false,
                         message:
                              "kamu tidak bisa membuat room karena telah mempunyai room " +
                              rlist.data.name,
                    };
          }
          let id = {
               name: roomName,
               passwordIsRequired: password,
               password: "",
               currentPlayers: 1,
               minPlayers: config.MinimumPlayers,
               maxPlayers: config.MaximumPlayers,
          };
          const rdata = id;
          mainLobby.push({
               status: true,
               gstatus: "waiting",
               voteSession: false,
               rid: rid,
               leader: jid,
               leader_name: mainPlayers[indexJid].username,
               data: rdata,
               players: [
                    {
                         jid: jid,
                         username: mainPlayers[indexJid].username,
                    },
               ],
          });
          mainPlayers[indexJid].onRoom = roomName;
          mainPlayers[indexJid].status = "onRoom";
          pushFile(UserMainPath, mainPlayers);
          pushFile(lobbyMainPath, mainLobby);
          return {
               status: true,
               gstatus: "waiting",
               rid: rid,
               leader: jid,
               leader_name: mainPlayers[indexJid].username,
               data: rdata,
               players: [
                    {
                         jid: jid,
                         username: mainPlayers[indexJid].username,
                    },
               ],
          };
     }
}

/**
 * Hapus room hanya untuk leader
 *
 * @param {string} jid_leader Nomer ID WhatsApp Leader
 */
function deleteRoom(jid_leader) {
     if (!jid_leader)
          return {
               status: false,
               message: "Masukan Nomer ID!",
          };
     jid_leader = !jid_leader.includes("@s.whatsapp.net") ? jid_leader + "@s.whatsapp.net" : jid_leader
     let playersList = [];
     for (let num of mainPlayers) {
          playersList.push(num.jid);
     }
     const indexJid = playersList.indexOf(jid_leader);
     if (indexJid == -1) {
          return {
               status: false,
               message: "Nomor kamu belum terdaftar pada game ini.",
          };
     } else {
          let jidList = [];
          for (let rlist of mainLobby) {
               jidList.push(rlist.leader);
          }
          if (!jidList.includes(jid_leader))
               return {
                    status: false,
                    message:
                         "kamu tidak bisa menghapus grup ini karena bukan room leader atau mungkin room sudah terhapus.",
               };
          const rindex = jidList.indexOf(jid_leader);
          if (mainLobby[rindex].leader) {
               nameRoomDeleted = mainLobby[rindex].data.name;
               mainLobby.splice(rindex, 1);
               for (let rList of mainPlayers) {
                    if (rList.onRoom == nameRoomDeleted) {
                         rList.onRoom = null;
                         rlist.status = "onLobby";
                         rlist.isVoted = false;
                         rlist.voted = 0;
                         rlist.isAction = false;
                    }
               }
               pushFile(UserMainPath, mainPlayers);
               pushFile(lobbyMainPath, mainLobby);
               return {
                    status: true,
                    message: "Room " + nameRoomDeleted + " Telah dihapus.",
               };
          }
     }
}

/**
 * Masuk room
 *
 * @param {string} roomName Nama room yang akan dimasuki.
 * @param {string} jid Nomer ID WhatsApp
 */
function joinRoom(roomName, jid) {
     if (!roomName)
          return {
               status: false,
               message: "Masukan Nama Room!",
          };
     if (!jid)
          return {
               status: false,
               message: "Masukan Nomer ID!",
          };
     jid = !jid.includes("@s.whatsapp.net") ? jid + "@s.whatsapp.net" : jid
     let playersList = [];
     for (let num of mainPlayers) {
          playersList.push(num.jid);
     }
     const indexJid = playersList.indexOf(jid);
     if (indexJid == -1) {
          return {
               status: false,
               message: "Nomor kamu belum terdaftar pada game ini.",
          };
     } else {
          for (let rlist of mainLobby) {
               if (rlist.leader === jid)
                    return {
                         status: false,
                         message:
                              "kamu tidak bisa memasuki room karena telah mempunyai room " +
                              rlist.data.name,
                    };
               if (mainPlayers[indexJid].onRoom != null)
                    return {
                         status: false,
                         message:
                              "Gagal join, karena kamu sudah memasuki room " + rlist.data.name,
                    };
               if (rlist.data.name != roomName) {
                    return {
                         status: false,
                         message: "Mohon maaf room sudah tidak ada.",
                    };
               } else if (rlist.data.currentPlayers > rlist.data.maxPlayers - 1) {
                    return {
                         status: false,
                         message: "kamu tidak bisa join, karna room sudah penuh.",
                    };
               } else {
                    rlist.players.push({
                         jid: jid,
                         username: mainPlayers[indexJid].username,
                    });
                    rlist.data.currentPlayers = rlist.data.currentPlayers + 1;
                    mainPlayers[indexJid].onRoom = roomName;
                    mainPlayers[indexJid].status = "onRoom";
                    pushFile(UserMainPath, mainPlayers);
                    pushFile(lobbyMainPath, mainLobby);
                    return rlist;
               }
          }
     }
}


/**
 * Keluar room
 *
 * @param {string} jid Nomer ID WhatsApp
 */
function leaveRoom(jid) {
     if (!jid)
          return {
               status: false,
               message: "Masukan Nomer ID!",
          };
     jid = !jid.includes("@s.whatsapp.net") ? jid + "@s.whatsapp.net" : jid
     let playersList = [];
     for (let num of mainPlayers) {
          playersList.push(num.jid);
     }
     const indexJid = playersList.indexOf(jid);
     if (indexJid == -1) {
          return {
               status: false,
               message: "Nomor kamu belum terdaftar pada game ini.",
          };
     } else {
          let rNames = [];
          let rLead = [];
          for (let rlist of mainLobby) {
               rNames.push(rlist.data.name);
               rLead.push(rlist.leader);
          }
          const onRoom = mainPlayers[indexJid].onRoom;
          if (onRoom == null)
               return {
                    status: false,
                    message: "kamu tidak bisa keluar karena tidak memasuki room manapun.",
               };
          const indexRoom = rNames.indexOf(onRoom);
          if (rLead.includes(jid)) {
               for (let rList of mainPlayers) {
                    if (rList.onRoom == mainLobby[indexRoom].data.name) {
                         rList.onRoom = null;
                         rlist.status = "onLobby";
                         rlist.isVoted = false;
                         rlist.voted = 0;
                         rlist.isAction = false;
                    }
               }
               mainLobby.splice(indexRoom, 1);
               pushFile(UserMainPath, mainPlayers);
               pushFile(lobbyMainPath, mainLobby);
               return {
                    status: true,
                    message:
                         "Berhasil keluar room " +
                         rNames[indexRoom] +
                         " dan room telah dihancurkan.",
               };
          } else {
               let ListedPlayersOnRoom = [];
               for (let list of mainLobby[indexRoom].players) {
                    ListedPlayersOnRoom.push(list);
               }
               const indexPOR = ListedPlayersOnRoom.indexOf(jid);
               mainLobby[indexRoom].players.splice(indexPOR, 1);
               mainPlayers[indexJid].onRoom = null;
               mainPlayers[indexJid].status = "onLobby";
               pushFile(UserMainPath, mainPlayers);
               pushFile(lobbyMainPath, mainLobby);
               return {
                    status: true,
                    message: "Berhasil keluar room " + rNames[indexRoom] + ".",
               };
          }
     }
}

/**
 * Memulai game werewolf
 *
 * @param {string} jid Nomer ID WhatsApp
 */
function startGame(jid) {
     if (!jid)
          return {
               status: false,
               message: "Masukan Nomer ID!",
          };
     jid = !jid.includes("@s.whatsapp.net") ? jid + "@s.whatsapp.net" : jid
     let playersList = [];
     for (let num of mainPlayers) {
          playersList.push(num.jid);
     }
     const indexJid = playersList.indexOf(jid);
     if (indexJid == -1) {
          return {
               status: false,
               message: "Nomor kamu belum terdaftar pada game ini.",
          };
     } else {
          let rNames = [];
          let rLead = [];
          for (let rlist of mainLobby) {
               rNames.push(rlist.data.name);
               rLead.push(rlist.leader);
          }
          const onRoom = mainPlayers[indexJid].onRoom;
          if (onRoom == null)
               return {
                    status: false,
                    message: "kamu tidak bisa memulai game karena tidak memasuki room manapun.",
               };
          const indexRoom = rNames.indexOf(onRoom);
          if (rLead.includes(jid)) {
               if (mainLobby[indexRoom].gstatus == 'playing') {
                    return { status: false, message: 'kamu sudah memulai game ini.' }
               } else if (mainLobby[indexRoom].data.currentPlayers < mainLobby[indexRoom].data.maxPlayers) {
                    return { status: false, message: 'Dibutuhkan 7 player, player sekarang : ' + mainLobby[indexRoom].data.currentPlayers + '/' + mainLobby[indexRoom].data.maxPlayers }
               } else {
                    let listed = []
                    let role = ['warga', 'warga', 'warga', 'penjaga', 'penerawang', 'serigala', 'serigala']
                    for (let i = 0; i < mainPlayers.length; i++) {
                         if (mainPlayers[i].onRoom == mainLobby[indexRoom].data.name) {
                              const randomRole = shuffle(role)
                              const indexRolena = randomRole.indexOf(listed.length - 1)
                              listed.push(mainPlayers[i].jid)
                              mainPlayers[i].status = "onGame";
                              mainPlayers[i].role = randomRole[randomRole.length - 1];
                              mainPlayers[i].isVoted = false;
                              mainPlayers[i].voted = 0;
                              mainPlayers[i].isAction = false;
                              // console.log({ index: mainPlayers[i].randomRole})
                              randomRole.splice(indexRolena, 1)
                         }
                    }
                    // return
                    mainLobby[indexRoom].gstatus = 'playing';
                    pushFile(UserMainPath, mainPlayers);
                    pushFile(lobbyMainPath, mainLobby);
                    return {
                         status: true,
                         message: gameplay.night[Math.floor(Math.random() * gameplay.night.length)],
                    };
               }
          } else {
               return {
                    status: false,
                    message: "Maaf kamu bukan room leader.",
               };
          }
     }
}

/**
 * Mengganti status room game werewolf
 *
 * @param {string} roomName Nama Room yang akan di ubah status
 * @param {string} status Nama status
 * 
 * status : playing / voting / action / waiting
 *   
 */
function changeStatus(roomName, status) {
     if (!roomName)
          return {
               status: false,
               message: "Masukan Nama Room!",
          };
     if (!status)
          return {
               status: false,
               message: "Masukan status room!",
          };
     if (!['playing', 'voting', 'action', 'waiting'].includes(status.toLowerCase())) return { status: false, message: 'Status ' + status + ' invalid!' }
     let rNames = [];
     let rLead = [];
     for (let rlist of mainLobby) {
          rNames.push(rlist.data.name);
          rLead.push(rlist.leader);
     }
     const indexRoom = rNames.indexOf(roomName);
     if (indexRoom == -1) return { status: false, message: 'Room ' + roomName + ' tidak ditemukan!' }
     mainLobby[indexRoom].gstatus = status;
     pushFile(UserMainPath, mainPlayers);
     pushFile(lobbyMainPath, mainLobby);
     return {
          status: true,
          message:
               "Room " +
               rNames[indexRoom] +
               " berhasil digantikan status dengan " + status,
     };
}


/**
 * Memberhentikan game werewolf
 *
 * @param {string} roomName Nama Room yang akan di stop
 */
function stopGame(roomName) {
     if (!roomName)
          return {
               status: false,
               message: "Masukan Nama Room!",
          };
     let rNames = [];
     let rLead = [];
     for (let rlist of mainLobby) {
          rNames.push(rlist.data.name);
          rLead.push(rlist.leader);
     }
     const indexRoom = rNames.indexOf(roomName);
     if (indexRoom == -1) return { status: false, message: 'Room ' + roomName + ' tidak ditemukan!' }
     for (let rList of mainPlayers) {
          if (rList.onRoom == mainLobby[indexRoom].data.name) {
               rList.status = "onRoom";
          }
     }
     mainLobby[indexRoom].gstatus = 'waiting';
     pushFile(UserMainPath, mainPlayers);
     pushFile(lobbyMainPath, mainLobby);
     return {
          status: true,
          message:
               "Room " +
               rNames[indexRoom] +
               " berhasil diberhentikan!.",
     };
}

/**
 * Aksi dalam game werewolf
 *
 * @param {string} jid Nomer ID WhatsApp
 * @param {string} action Aksi dari masing-masing role
 * 
 * Aksi = kill / jaga / terawang
 */
function action(jid, action, target) {
     if (!jid)
          return {
               status: false,
               message: "Masukan Nomer ID!",
          };
     if (!action)
          return {
               status: false,
               message: "Masukan Aksi! kill / terawang / jaga",
          };
     if (!target)
          return {
               status: false,
               message: "Masukan Target aksi!",
          };
     jid = !jid.includes("@s.whatsapp.net") ? jid + "@s.whatsapp.net" : jid
     target = !target.includes("@s.whatsapp.net") ? target + "@s.whatsapp.net" : target
     let playersList = [];
     for (let num of mainPlayers) {
          playersList.push(num.jid);
     }
     const indexJid = playersList.indexOf(jid);
     const indexTarget = playersList.indexOf(target);
     const stRole = mainPlayers[indexJid].role;
     if (indexJid == -1) {
          return {
               status: false,
               message: "Nomor kamu belum terdaftar pada game ini.",
          };
     } else {
          let rNames = [];
          let rLead = [];
          for (let rlist of mainLobby) {
               rNames.push(rlist.data.name);
               rLead.push(rlist.leader);
          }
          const onRoom = mainPlayers[indexJid].onRoom;
          const indexRoom = rNames.indexOf(onRoom);
          if (onRoom == null) {
               return {
                    status: false,
                    message: "kamu tidak bisa memilih aksi karena tidak memasuki room manapun.",
               }
          } else if (mainLobby[indexRoom].gstatus != 'action') {
               return { status: false, message: 'Belum masuk sesi aksi!' }
          } else if (mainPlayers[indexJid].isAction == true) {
               return { status: false, message: 'Kamu sudah memilih aksi ' + mainPlayers[indexJid].role == "serigala" ? 'kill' : mainPlayers[indexJid].role == "penjaga" ? 'jaga' : 'terawang' + ' ke target ' + mainPlayers[indexTarget] }
          } else {
               let listPlayers = []
               let RoomPlayers = []
               let listAction = []
               for (let j = 0; j < mainLobby[indexRoom].players.length; j++) {
                    RoomPlayers.push(mainLobby[indexRoom].players[j].jid)
               }
               for (let i = 0; i < mainPlayers.length; i++) {
                    if (RoomPlayers.includes(mainPlayers[i].jid)) {
                         listPlayers.push(mainPlayers[i].jid)
                         listAction.push(mainPlayers[i].role)
                    }
               }

               if (!['kill', 'jaga', 'terawang'].includes(action.toLowerCase()))
                    return { status: false, message: 'Tidak dapat mengeksekusi aksi ' + action }
               if (stRole == 'penerawang') {
                    if (action == 'terawang') {
                         mainPlayers[indexTarget].action = 'terawang'
                         mainPlayers[indexJid].isAction = true;
                         pushFile(UserMainPath, mainPlayers);
                         pushFile(lobbyMainPath, mainLobby);
                         return { status: true, message: 'Target yang kamu lihat adalah ' + mainPlayers[indexTarget].role }
                    } else {
                         return { status: false, message: 'Maaf kamu adalah ' + mainPlayers[indexJid].role + ' bukan ' + (action == 'jaga' ? 'penjaga' : action == 'kill' ? 'serigala' : 'penerawang') }
                    }
               } else if (stRole == 'penjaga') {
                    if (action == 'jaga') {
                         mainPlayers[indexTarget].action = 'jaga'
                         mainPlayers[indexJid].isAction = true;
                         pushFile(UserMainPath, mainPlayers);
                         pushFile(lobbyMainPath, mainLobby);
                         return { status: true, message: 'Berhasil menjaga warga ' + mainPlayers[indexTarget].username }
                    } else {
                         return { status: false, message: 'Maaf kamu adalah ' + mainPlayers[indexJid].role + ' bukan ' + (action == 'jaga' ? 'penjaga' : action == 'kill' ? 'serigala' : 'penerawang') }
                    }
               } else if (stRole == 'serigala') {
                    if (action == 'kill') {
                         mainPlayers[indexTarget].action = 'kill'
                         mainPlayers[indexJid].isAction = true;
                         pushFile(UserMainPath, mainPlayers);
                         pushFile(lobbyMainPath, mainLobby);
                         return { status: true, message: 'Kamu telah kill ' + mainPlayers[indexTarget].username }
                    } else {
                         return { status: false, message: 'Maaf kamu adalah ' + mainPlayers[indexJid].role + ' bukan ' + (action == 'jaga' ? 'penjaga' : action == 'kill' ? 'serigala' : 'penerawang') }
                    }
               } else if (stRole == 'warga') {
                    return { status: true, message: 'Warga tidak bisa melakukan aksi apa-apa, mohon tunggu sampai sesi voting' }
               } else {
                    return { status: false, message: 'Kamu belum masuk atau memulai permainan!' }
               }
          }
     }
}

/**
 * Voting user werewolf
 *
 * @param {string} roomName Nama Room 
 * @param {string} jid Nomer ID WhatsApp
 * @param {string} toJid Nomer ID WA yg akan di vote/refuse
 * @param {string} vote Pilih satu antara vote/refuse
 */
function voting(roomName, jid, toJid, vote) {
     if (!jid)
          return {
               status: false,
               message: "Masukan jid",
          };
     if (!toJid)
          return {
               status: false,
               message: "Masukan target jid",
          };
     if (!vote)
          return {
               status: false,
               message: "Pilih vote/refuse",
          };
     toJid = !toJid.includes("@s.whatsapp.net") ? toJid + "@s.whatsapp.net" : toJid
     jid = !jid.includes("@s.whatsapp.net") ? jid + "@s.whatsapp.net" : jid
     let playersList = [];
     for (let num of mainPlayers) {
          playersList.push(num.jid);
     }
     const indexJid = playersList.indexOf(jid);
     const indexToJid = playersList.indexOf(toJid);
     const onRoom = mainPlayers[indexJid].onRoom;
     if (onRoom == null)
          return {
               status: false,
               message: "kamu tidak bisa memilih aksi karena tidak memasuki room manapun.",
          };
     if (indexJid == -1) {
          return {
               status: false,
               message: "Nomor kamu belum terdaftar pada game ini.",
          };
     } else if (mainLobby[indexRoom].gstatus != 'voting') {
          return { status: false, message: 'Belum masuk sesi voting!' }
     } else {
          let rNames = [];
          let rLead = [];
          for (let rlist of mainLobby) {
               rNames.push(rlist.data.name);
               rLead.push(rlist.leader);
          }
          const indexRoom = rNames.indexOf(roomName);
          const isVoted = mainPlayers[indexJid].isVoted;

          if (isVoted)
               return {
                    status: false,
                    message: "kamu sudah vote seseorang.",
               };
          if (indexRoom == -1) return { status: false, message: 'Room dengan nama ' + roomName + ' Tidak Ditemukan!' }
          if (mainLobby[indexRoom].voteSession) {
               mainPlayers[indexToJid].voted = mainPlayers[indexToJid].voted + 1
               mainPlayers[indexJid].isVoted = true
               pushFile(UserMainPath, mainPlayers);
               pushFile(lobbyMainPath, mainLobby);

               let listPlayers = []
               let RoomPlayers = []
               let listVote = []
               for (let j = 0; j < mainLobby[indexRoom].players.length; j++) {
                    RoomPlayers.push(mainLobby[indexRoom].players[j].jid)
               }
               for (let i = 0; i < mainPlayers.length; i++) {
                    if (RoomPlayers.includes(mainPlayers[i].jid)) {
                         listPlayers.push(mainPlayers[i].isVoted)
                         listVote.push(mainPlayers[i].voted)
                    }
               }
               const checkAll = (arr) => arr.every(val => val === true);
               let ceker = []
               if (checkAll(listPlayers)) {
                    const max = Math.max(...listVote)
                    for (let val of listVote) {
                         if (val == max) {
                              ceker.push(val)
                         }
                    }
                    if (ceker.length > 1) {
                         return {
                              status: true,
                              action: 'seri',
                              message:
                                   "Berhasil vote " + mainPlayers[indexToJid].username,
                              jid: jid,
                              toJid: toJid
                         };
                    } else {
                         return {
                              status: true,
                              action: 'gantung',
                              message:
                                   "Berhasil vote " + mainPlayers[indexToJid].username,
                              jid: jid,
                              toJid: toJid
                         };
                    }
               }

               return {
                    status: true,
                    action: 'none',
                    message:
                         "Berhasil vote " + mainPlayers[indexToJid].username,
                    jid: jid,
                    toJid: toJid
               };
          } else {
               return { status: false, message: 'Mohon tunggu sampai sesi vote dimulai!' }
          }
     }
}


/**
 * Daftar user werewolf
 *
 * @param {string} nickname Masukan nickname kamu.
 * @param {string} jid Nomer ID WhatsApp
 */
function daftarUser(nickname, jid) {
     if (!nickname)
          return {
               status: false,
               message: "Masukan nickname kamu..",
          };
     let nameLocate = [];
     let jidLocate = [];
     for (let n of mainPlayers) {
          nameLocate.push(n.username);
          jidLocate.push(n.jid);
     }
     if (nameLocate.includes(nickname)) {
          return {
               status: false,
               message: "Nickname telah dipakai!",
          };
     } else if (
          jidLocate.includes(
               !jid.includes("@s.whatsapp.net") ? jid + "@s.whatsapp.net" : jid
          )
     ) {
          return {
               status: false,
               message: "Nomer kamu telah terdaftar silahkan ketik *!wwmenu*",
          };
     } else {
          const obj = {
               pid: mainPlayers.length + 1,
               status: "onLobby",
               jid: !jid.includes("@s.whatsapp.net") ? jid + "@s.whatsapp.net" : jid,
               username: nickname,
               role: "",
               action: "",
               isAction: false,
               level: 1,
               total_win: 0,
               onRoom: null,
               banned: false,
               isVoted: false,
               voted: 0
          };
          mainPlayers.push(obj);
          pushFile(UserMainPath, mainPlayers);
          return {
               status: true,
               message: "Berhasil daftar user dengan username : " + nickname,
          };
     }
}

// const daftar = daftarUser("Nimu", "02391578210920");
// const buatRoom = newRoom('Merhas', '4')
// const join = joinRoom('Merhas', '6278161892')
// const leave = leaveRoom('6285559038021@s.whatsapp.net')
// const hapusRoom = deleteRoom('6285559038021@s.whatsapp.net')
const start = startGame('4')
// const stop = stopGame('Merhas') // OWNER ONLY
// const change = changeStatus('Merhas', 'action')
// const aksi = action('9090123123', 'terawang', '4')
// const vote = voting('Merhas', '', '4', 'vote')

console.log(start);
