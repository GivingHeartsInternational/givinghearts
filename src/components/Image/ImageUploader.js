import React, { Component } from 'react';
import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
//import firebase from 'firebase';
//import 'firebase/storage';

class ImageUploader extends Component {
	constructor(props) {
		super(props);

		this.state = {
			image: null,
			url: '',
			progress: 0,
			folder: this.props.folder,
			loading: false
		};
	}

	handleChange = (e) => {
	  if (e.target.files[0]) {
    	const image = e.target.files[0];
    	this.setState(() => ({image}));
    }
	}

	handleUpload = () => {

		const {image, folder } = this.state;

		if(image) {
			this.setState({loading: true});
			this.props.firebase.storage.ref(`${folder}/${image.name}`).put(image).then(() => {
	    	this.setState({ loading: false });
	   		this.props.onImageUpload(image.name, this.props.imageStateName);
			}); 

			const newMetadata = {
			  cacheControl: 'public,max-age=4000',
			  contentType: 'image/png'
			};

			this.props.firebase.storage.ref(`${folder}/${image.name}`).updateMetadata(newMetadata)
		  .then((metadata) => {
		    // Updated metadata for 'images/forest.jpg' is returned in the Promise
		  }).catch((error) => {
		    // Uh-oh, an error occurred!
		  });
		}

		this.setState({
		    image: null
		});
	}

	render(){

		const { loading } = this.state;

		return(
			<div className="file-uploader">
				<input
					className="file-upload" 
					type="file"
					onChange={this.handleChange}
				/>

				{loading && <div className="lds-dual-ring"></div>}

				<button className="upload-button btn btn-blue " onClick={this.handleUpload}>Завантажити</button>
			</div>
		);
	}
}

export default withFirebase(ImageUploader);