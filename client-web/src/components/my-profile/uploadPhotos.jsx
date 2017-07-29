import React from 'react';
import Reflux from 'reflux';
import Store from '../../tools/store/store';
import Dropzone from 'react-dropzone';
import _ from 'lodash';

import CustomAxios from '../../tools/connectivity/api';

export default class UploadPhotos extends Reflux.Component {
	constructor(props) {
		super(props);
		this.state = {
			photos: [],
			files: []
		};
		this.store = Store;
	}
	
	componentDidMount() {
		this.setState({
			photos: this.props.user.photos
		});
	}
	
	deletePhoto(id, index) {
		const that = this;
				
		CustomAxios.delete('/photos/'+id+'?apikey='+this.state.user.apikey)
		.then(function(response) {			
			if (response.status === 204) {				
				let updatedPhotos = that.state.photos;
				delete updatedPhotos[index];
				
				that.setState({
					photos: updatedPhotos
				});				
			}
		});	
	}
	
	onDrop(accepted, rejected) {		
		this.setState({
			files: accepted
		});
	}
	
	uploadFiles() {
        const that = this;
		
        let formData = new FormData();

        _.map(this.state.files, (file, index) => {
            formData.append('file', file);
		});
		
		CustomAxios.post('/upload?apikey='+this.state.user.apikey, formData)
		.then(function(response) {						
			if (response.status === 200) {				
				let updatedPhotos = that.state.photos;
				response.data.forEach((photo, index) => {
					updatedPhotos.push({
						id: photo.id,
						path: photo.path
					});
				})
				
				that.setState({
					photos: updatedPhotos,
					files: []
				});
			}
		});	
    }
	
	render() {				
		const photos = this.state.photos;
		
		return (
			<div>
				{this.state.photos ?
					<div>
						<div className="row">
							<h4 className="col-md-12">Previously uploaded photos</h4>
							{photos.length > 0 ?
								(photos.map((photo, index) => {
									return (
										<div key={index} className="col-md-3">
											<button className="btn btn-outline-success btn-sm disabled">Set As Main</button>
											<button className="btn btn-outline-danger btn-sm float-right" onClick={() => this.deletePhoto(photo.id, index)}>Delete</button>
											
											<img src={"http://assets.upendo.localhost"+photo.path} className="img-thumbnail" />
											
										</div>
									);
								}))
							:
								<div className="col-md-12">
									<div className="row">
										<div className="col-md-3">
											<img src="https://unsplash.it/200/200" width="200px" height="200px" />
										</div>
										<div className="col-md-3">
											<img src="https://unsplash.it/200/200" width="200px" height="200px" />
										</div>
										<div className="col-md-3">
											<img src="https://unsplash.it/200/200" width="200px" height="200px" />
										</div>
										<div className="col-md-3">
											<img src="https://unsplash.it/200/200" width="200px" height="200px" />								
										</div>							
									</div>
								</div>
							}
						</div>
						<br />
						<hr />
						<div className="row">							
							<h4 className="col-md-12">Upload new photos</h4>
							<div className="col-md-6">
								<h5>Dropzone</h5>
								<Dropzone 
									style={{width: '100%', border: "dashed 2px grey", borderRadius: "5%"}}
									accept="image/jpeg, image/jpg"
									onDrop={this.onDrop.bind(this)}>
									<div className="text-md-center">
										<br />
										<p>Drop photos you want to add to your profile here.</p>
										<p>Only *.jpeg and *.jpg images will be accepted.</p>
										<br />
									</div>
								</Dropzone>
								<br />
								<button onClick={this.uploadFiles.bind(this)} className="btn btn-primary float-right">Upload my photos!</button>
							</div>
							<div className="col-md-6">
								<h5>Preview</h5>
								<div className="row">
									{this.state.files.map((file, index) => (
										<div key={index} className="col-md-6">
											<img className="img-thumbnail" src={file.preview} />
											<br />
											{file.name}
											<br />
											{file.size} bytes
										</div>
									))}
								</div>
							</div>
						</div>
						<br />
					</div>
				: 'Loading...'}
			</div>
		)
	}
}