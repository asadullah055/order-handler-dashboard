import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_seller_profile } from "../../features/auth/authSlice";

const Profile = () => {
  const [image, setImage] = useState(""); // for previewing the image
  const [file, setFile] = useState(null); // to hold the actual file
  const [formData, setFormData] = useState({
    name: "",
    shopName: "",
  });

  const handleImageError = (e) => {
    e.target.src = "/images/default.jfif"; // Fallback image on error
  };

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(URL.createObjectURL(selectedFile)); // for preview
      setFile(selectedFile); // store the file for form submission
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("shopName", formData.shopName);

    if (file) {
      data.append("image", file);
    }

    dispatch(update_seller_profile(data));
  };

  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo.name || "",
        shopName: userInfo.shopName || "",
      });
      setImage(userInfo.shopLogo || ""); // for preview
    }
  }, [userInfo]);

  return (
    <div className="md:w-[85%] w-[90%] bg-white p-3 mx-auto rounded-md">
      <h1 className="text-3xl p-2 font-semibold">Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="w-full border rounded p-2">
          {/* upload image */}
          <div className="flex items-center justify-center flex-col gap-3 p-2 ">
            <img
              className="w-[200px] p-1 rounded-md border"
              src={image || "/images/default.jfif"}
              alt="shop logo"
              onError={handleImageError} // Fallback to default image on error
            />
            <label htmlFor="fileInput">
              <div className="flex py-1 px-3 justify-center items-center gap-2">
                <p className="bg-teal-500 p-2 text-white rounded-md cursor-pointer">
                  Upload Shop Logo
                </p>
              </div>
              <input
                id="fileInput"
                className="hidden"
                type="file"
                accept=".png,.jpg,.jpeg.,webp"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div>
            <label htmlFor="name" className="py-3 font-[20px]">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="border focus:outline-gray-400 mt-2 p-3 w-full rounded"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-2">
            <p htmlFor="name" className="py-1 font-[20px]">
              Your Email
            </p>
            <div className="border focus:outline-gray-400 mt-2 p-3 w-full rounded">
              {userInfo.email}
            </div>
          </div>
          <div className="mt-2">
            <label htmlFor="shopFild" className="py-3 font-[20px]">
              Shop Name
            </label>
            <input
              type="text"
              id="shopFild"
              name="shopName"
              className="border focus:outline-gray-400 mt-2 p-3 w-full rounded"
              placeholder="Shop name"
              value={formData.shopName}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-2">
            <button
              onClick={handleSubmit}
              className="w-1/2 bg-teal-500 text-white p-2 rounded-md"
            >
              Update
            </button>
          </div>
        </div>
        {/* Password section */}
        <div className="w-full border rounded p-2">
          <div className="mt-2">
            <label htmlFor="oldPassword" className="py-3 font-[20px]">
              Old Password
            </label>
            <input
              type="password"
              id="oldPassword"
              className="border focus:outline-gray-400 mt-2 p-3 w-full rounded"
              placeholder="Old Password"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="newPassword" className="py-3 font-[20px]">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="border focus:outline-gray-400 mt-2 p-3 w-full rounded"
              placeholder="New Password"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="confirmPassword" className="py-3 font-[20px]">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="border focus:outline-gray-400 mt-2 p-3 w-full rounded"
              placeholder="Confirm Password"
            />
          </div>
          <div className="mt-2">
            <button className="w-1/2 bg-teal-500 text-white p-2 rounded-md">
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
