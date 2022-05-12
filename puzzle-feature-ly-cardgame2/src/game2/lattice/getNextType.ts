import { ASSETS } from "../assets"

export const getNextType = () => {
    return Math.floor(Math.random() * ASSETS.frontList.length)

}