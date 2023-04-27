const urlRegex = new RegExp(
  
    "^https?://(?:[a-z0-9-]+.)+[a-z]{2,6}(?:/[^/#?]+)+.(?:jpe?g|gif|png|bmp)$"
  
);

const emailRegex = new RegExp(
  "^[a-zA-Z0-9_.+]+(?<!^[0-9])@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
);

export { urlRegex,
        emailRegex };