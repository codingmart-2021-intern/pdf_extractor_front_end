import { Component } from "react";
import { storage } from "./firebase";
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import classes from "./upload.module.css";

class Firebase extends Component {
    state = {
        url: "",
        file: []
    }

    beforeUpload = (file) => {
        const isPdf = file.type === 'application/pdf';
        if (!isPdf) {
            message.error('You can only upload PDF file!');
        }
        return isPdf;
    }


    handleUpload = (e) => {
        console.log(e.file.originFileObj.name);
        this.props.setSpinning(true)
        this.setState({ file: [e.file.originFileObj] })
        console.log(e.file.originFileObj);
        const uploadTask = storage.ref(`file/${e.file.originFileObj.name}`).put(e.file.originFileObj);
        uploadTask.on(
            "state_changed",
            snapshot => { },
            error => {
                console.log(error)
                this.props.setUploaded(false)
            },
            () => {
                storage
                    .ref("file")
                    .child(e.file.originFileObj.name)
                    .getDownloadURL()
                    .then(url => {
                        console.log(url);
                        // this.props.onChange(url)
                        // Notification.show({ status: true, message: "Please save the changes" })
                        this.props.setUrl(url)
                        this.props.setUploaded(true)
                        this.props.setFilename(e.file.originFileObj.name)
                    })
            }
        )
    }

    render() {
        return (
            <div className={classes.upload}>
                <Upload
                    onChange={this.handleUpload}
                    multiple={false}
                    fileList={this.state.file}
                    // beforeUpload={this.beforeUpload}
                    // action={"http://test.autocloud.in//api/upload/mocky"}
                    showUploadList={false}
                // onRemove={() => this.setState({ file: [] })}
                >
                    <button
                        className={classes.upload_but}
                    // icon={<UploadOutlined />}
                    >
                        <UploadOutlined style={{ marginRight: "20px" }} />   Click to Upload</button>
                </Upload>
            </div>
        )
    }
}

export default Firebase;