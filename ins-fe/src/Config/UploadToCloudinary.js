export const uploadToCloudinary = async (image) => {
    if(image){
        const data = new FormData();
        data.append("file", image)
        data.append("upload_preset", "instagram")
        data.append("cloud_name", "df9lkpbxg")

        const response = await fetch(`https://api.cloudinary.com/v1_1/df9lkpbxg/image/upload`, {
            method: "POST",
            body: data
        })

        const fileData = await response.json();

        console.log("File Data", fileData);
        return fileData.url.toString();
    }
}