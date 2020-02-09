let RESOLUTION = 500;
// MAX_RESOLUTION = 500;

export const getCamera = new Promise((res, rej) => {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: RESOLUTION,
          height: RESOLUTION
        }
      })
      .then(function(stream) {
        /*let trackWidth = stream.getVideoTracks()[0].getSettings().width,
        trackHeight = stream.getVideoTracks()[0].getSettings().height;
        let scale = trackWidth > MAX_RESOLUTION ? MAX_RESOLUTION / trackWidth : 1;*/
        res({
          stream,
          width: RESOLUTION,
          height: RESOLUTION
        });
      })
      .catch(function(err) {
        rej(err);
      });
  }
});

export function takePhoto(videoElement, camera) {
  let canvasElement = document.createElement("canvas");
  canvasElement.style.display = "none";
  canvasElement.width = camera.width;
  canvasElement.height = camera.height;

  let ctx = canvasElement.getContext("2d");
  ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  ctx.drawImage(videoElement, 0, 0, camera.width, camera.height);
  let photoData = canvasElement.toDataURL();
  canvasElement.remove();
  return photoData;
}
