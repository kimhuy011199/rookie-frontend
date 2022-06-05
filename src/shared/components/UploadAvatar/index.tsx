import React, { useEffect, useState } from 'react';
import { MdCameraAlt } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImg } from '../../../stores/uploads/uploadSlice';
import { updateUser } from '../../../stores/auth/authSlice';
import style from './style.module.css';

const UploadAvatar = () => {
  const [inputValue, setInputValue] = useState<any>('');
  const [previewImgSrc, setPreviewImgSrc] = useState<any>('');
  const [selectedFile, setSelectedFile] = useState<any>();

  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const { data, isLoading, isSuccess } = useSelector(
    (state: any) => state.upload
  );

  const handleInputValueChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    previewFile(file);
    setSelectedFile(file);
    setInputValue(e.target.value);
  };

  const previewFile = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImgSrc(reader.result);
    };
  };

  const handleSubmitFile = () => {
    if (!selectedFile) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      if (reader.result) {
        uploadImage(reader.result);
      }
    };
    reader.onerror = () => {};
  };

  const uploadImage = async (base64EncodedImage: string | ArrayBuffer) => {
    try {
      // Upload image to cloudinary
      dispatch(uploadImg({ data: base64EncodedImage }));
      setInputValue('');
    } catch (err) {}
  };

  useEffect(() => {
    if (isSuccess) {
      // Update user when uploading image to cloudinary is done
      dispatch(updateUser({ _id: user._id, avatarImg: data.url }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data]);

  return (
    <div className={style.container}>
      <div className={style.imgContainer}>
        {!user?.avatarImg && !previewImgSrc && (
          <img src="" alt="avatar" className={style.preview} />
        )}
        {user?.avatarImg && !previewImgSrc && (
          <img src={user?.avatarImg} alt="avatar" className={style.preview} />
        )}
        {previewImgSrc && (
          <img src={previewImgSrc} alt="avatar" className={style.preview} />
        )}
      </div>
      {!isLoading && <label htmlFor="avatar" className={style.input}></label>}
      <input
        hidden
        type="file"
        name="avatar"
        id="avatar"
        disabled={isLoading}
        onChange={handleInputValueChange}
        value={inputValue}
      />
      <button
        className={style.submit}
        onClick={handleSubmitFile}
        disabled={!selectedFile || isLoading}
      >
        <MdCameraAlt className={style.icon} />
      </button>
    </div>
  );
};

export default UploadAvatar;