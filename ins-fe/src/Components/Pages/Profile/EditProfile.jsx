import { Button, Input, Select, Textarea, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoMdNotifications } from "react-icons/io";
import { ImBlocked } from "react-icons/im";
import { MdHideSource } from "react-icons/md";
import { TiLockClosed } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../../State/User/Action";
import { uploadToCloudinary } from "../../../Config/UploadToCloudinary";

const CustomButton = ({ icon, text, color }) => {
  return (
    <Button
      leftIcon={icon}
      variant="solid"
      justifyContent="flex-start"
      colorScheme={color}
    >
      {text}
    </Button>
  );
};

const EditProfile = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store);
  const [bio, setBio] = useState(0);
  const [data, setData] = useState({
    userImage: user?.user?.data?.result?.userImage,
    bio: user?.user?.data?.result?.bio,
    gender: user?.user?.data?.result?.gender,
  });

  const handleSubmit = async (req) => {
    setLoading(true);
    try {
      dispatch(updateUser(req));
      setTimeout(() => {
        setLoading(false);
        toast({
          title: "Profile updated.",
          description: "Your profile has been successfully updated.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
        toast({
          title: "Error.",
          description: "There was an error updating your profile.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }, 2000);
    }
  };

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const handleImage = async (e) => {
    const image = e.target.files[0];
    setLoadingImage(true);

    const url = await uploadToCloudinary(image);
    setData((prev) => ({
      ...prev,
      userImage: url,
    }));
    setLoadingImage(false);
  };

  const handleBio = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setBio(e.target.value);
  };

  const handleGender = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex">
      <div className="flex flex-col w-[30%] px-10 space-y-3 border-r-2 border-r-stone-200">
        <p className="p-10 text-2xl font-bold">Settings</p>
        <p>How you use Instagram</p>
        <CustomButton icon={<CgProfile />} text="Edit Profile" color="pink" />
        <CustomButton icon={<IoMdNotifications />} text="Notifications" />

        <p>How you use Instagram</p>
        <CustomButton icon={<CgProfile />} text="Professional Account" />
        <CustomButton
          icon={<IoMdNotifications />}
          text="Create tools and controls"
        />

        <p>Who can see your content</p>
        <CustomButton icon={<CgProfile />} text="Account Privacy" />
        <CustomButton icon={<TiLockClosed />} text="Close friends" />
        <CustomButton icon={<ImBlocked />} text="Blocked" />
        <CustomButton icon={<MdHideSource />} text="Hide story and live" />
      </div>
      <div className="w-[70%] px-32 space-y-3">
        <div className="py-10">
          <p className="text-2xl font-bold">Edit Profile</p>
        </div>
        <div>
          <div>
            <div className="flex justify-between items-center mt-5 p-5 bg-slate-200 rounded-3xl">
              <div className="flex items-center space-x-3">
                {loadingImage ? (
                  <div class="border-gray-300 h-16 w-16 animate-spin rounded-full border-8 border-t-blue-600" />
                ) : (
                  <img
                    className="w-16 h-16 rounded-full"
                    src={
                      data.userImage
                        ? data.userImage
                        : "https://hzshop.ir/img/accountimg.png"
                    }
                    alt=""
                  />
                )}
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="text-md font-semibold">
                      {user.user.data?.result.username}
                    </p>
                  </div>
                  <p className="">{user.user.data?.result.fullName}</p>
                </div>
              </div>
              <Button colorScheme="blue">
                {" "}
                <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
                  Change Photo
                </label>
                <input
                  id="file-upload"
                  type="file"
                  style={{ display: "none" }}
                  accept="image/*"
                  name="userImage"
                  onChange={handleImage}
                />
              </Button>
            </div>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-lg font-semibold">Website</p>
          <Input
            variant="filled"
            bgColor="gray.300"
            placeholder="Website"
            disabled
          />
          <p className="opacity-60">
            Editing your links is only available on mobile. Visit the Instagram
            app and edit your profile to change the websites in your bio.
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-lg font-semibold">Bio</p>
          <Textarea
            placeholder="Bio"
            name="bio"
            value={data.bio}
            onChange={handleBio}
          />
          <p className="flex justify-end">{bio?.length}/2000</p>
        </div>
        <div className="space-y-2">
          <p className="text-lg font-semibold">Gender</p>
          <Select name="gender" value={data.gender} onChange={handleGender}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Select>
        </div>
        <div className="flex justify-end pt-10">
          {loading ? (
            <button
              type="button"
              class="py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg max-w-md"
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                class="mr-2 animate-spin"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
              </svg>
              Loading
            </button>
          ) : (
            <Button
              width="50%"
              size="lg"
              colorScheme="blue"
              onClick={() => handleSubmit(data)}
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
