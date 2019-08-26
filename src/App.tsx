import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import ImageGallery from 'react-image-gallery';
import { ReactImageGalleryItem } from 'react-image-gallery';
import '../node_modules/react-image-gallery/styles/scss/image-gallery.scss';
import styles from './App.module.scss';
import './overrides.scss';

const convertType = (type: string | ArrayBuffer | null):string => {
	if (typeof type === 'string') {
		return type;
	} else {
		return '';
	}
};

const App: React.FC<{}> = () => {
	const [imageSrcs, setImageSrcs] = useState([] as ReactImageGalleryItem[]);
	
	const handleOnDrop = <T extends File>(acceptedFiles: T[]) => {
		if (acceptedFiles && acceptedFiles.length > 0) {
			for (let i = 0; i < acceptedFiles.length; i++) {
				const reader = new FileReader();
				reader.onload = () => {
					imageSrcs.push({
						original: convertType(reader.result),
						thumbnail: convertType(reader.result),
						originalClass: 'original-image'
					});
					setImageSrcs([...imageSrcs]);
				};
				reader.readAsDataURL(acceptedFiles[i]);
			}
		}
	};
	
	imageSrcs.forEach((item, i) => item.description = `${i+1} из ${imageSrcs.length}`);
	
  return (
    <div className={styles['App']}>
      <Dropzone onDrop={handleOnDrop}>
				{({ getRootProps, getInputProps }) => (
					<section>
						<div className={styles['files-dropzone']} {...getRootProps()}>
							<input {...getInputProps()} />
							<p className={styles['files-drop']}>
								Перетащите файлы в эту область<br />или<br /><span className={styles['span-blue']}>Выберите на компьютере</span>
							</p>
						</div>
					</section>
				)}
			</Dropzone>
			{imageSrcs.length > 0 && (
				<ImageGallery
					items={imageSrcs}
					useBrowserFullscreen={false}
				/>
			)}
    </div>
  );
}

export default App;