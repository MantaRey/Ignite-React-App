//Media Resize

export const smallImage = (imageSrc, size) => {
  const image = imageSrc.match(/media\/screenshots/)
    ? imageSrc.replace(
        "media/screenshots",
        `media/resize/${size}/-/screenshots`
      )
    : imageSrc.replace("media/games/", `media/resize/${size}/-/games/`);
  return image;
};
