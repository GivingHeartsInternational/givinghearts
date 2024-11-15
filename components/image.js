import { getStrapiMedia } from "../lib/media"
import NextImage from "next/image"

const Image = ({ image, width, height, style, imageurl }) => {
  //if (!image.data) return false

  if (!imageurl) imageurl = "/"

  // const { url, alternativeText } = image?.data?.attributes

  !width ? (width = image?.data.attributes.width) : null
  !height ? (height = image?.data.attributes.height) : null
  // const loader = () => {
  //   return getStrapiMedia(image)
  // }

  return (
    <NextImage
      // loader={loader}
      layout="responsive"
      width={width}
      height={height}
      objectFit="cover"
      src={imageurl}
    />
  )
}

export default Image
//   {/* src={getStrapiMedia(image)}*/}
//alt={alternativeText || ""}
