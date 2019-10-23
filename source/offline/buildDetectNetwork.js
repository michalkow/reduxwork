export default options => callback => {
  const { socket } = options;
  if (socket) {
    socket.on('connect', () =>
      callback({ online: true }));
    socket.on('disconnect', () =>
      callback({ online: false }));
  }
};