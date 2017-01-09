export function getDataUrl(file) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onload = function(event) {
      resolve(event.target['result']);
    };
    reader.readAsDataURL(file);
  });
}
