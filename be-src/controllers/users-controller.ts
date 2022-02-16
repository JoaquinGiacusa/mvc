import { User, Product, Auth } from "../models";
import { cloudinary } from "../lib/cloudinary";

export async function createProduct(userId: number, productData) {
  if (!userId) {
    throw "userid es necesario";
  }
  const user = await User.findByPk(userId);
  if (user) {
    const product = await Product.create({
      title: productData.title,
      userId: user.get("id"),
    });

    return product;
  } else {
    throw "error, user not found";
  }
}

export async function updateProfile(userId, updateData) {
  if (updateData.imagaDataURL) {
    const imagen = await cloudinary.uploader.upload(updateData.imagaDataURL, {
      resource_type: "image",
      discard_original_filename: true,
      width: 1000,
    });

    const updateDataComlete = {
      fullName: updateData.fullName,
      bio: updateData.bio,
      pictureURL: imagen.secure_url,
    };

    await User.update(updateDataComlete, { where: { id: userId } });
    return updateDataComlete;
  } else {
    console.error("no hay imagen adjunta");
  }
}

export async function getProfile(userId) {
  const userProfile = await User.findByPk(userId);
  console.log("userProfile", userProfile);

  return userProfile;
}
