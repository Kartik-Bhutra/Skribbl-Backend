import roomIDGenerator from "../generateRoomID.js";

const rooms = [];

export function handleJoinRoom(socket, username) {
    let roomID = roomIDGenerator();
    if (rooms.length === 0) {
        rooms.push({
            roomID,
            users: [username]
        });
    } else {
        let flag = false;
        for (let i = 0; i < rooms.length; i++) {
            if (rooms[i].users.length < 2) {
                rooms[i].users.push(username);
                roomID = rooms[i].roomID;
                flag = true;
                break;
            }
        }
        if (!flag) {
            rooms.push({
                roomID,
                users: [username]
            });
        }
    }
    socket.join(roomID);
}