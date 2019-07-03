import React from 'react';
import axios from 'axios';

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Title: null,
            Description: null,
            TypeOfAp: null,
            img1: null,
            Address: null,
            Price: null,
            PhoneNumber: null,
            errMsg: null,
            titleCompleted: false,
            errAlert: false,
            typeCompleted: false,
            addressCompleted: false,
            priceCompleted: false,
            phoneNumberCompleted: false,
            descriptionCompleted: false,
            imgCompleted: false,
            closePopup: false
        };
        // this.handleErrors = this.handleErrors.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        //const imgs = new FormData();
        //imgs.append('file',this.state.img1);
        if (this.state.titleCompleted === true && this.state.typeCompleted === true && this.state.addressCompleted === true && this.state.priceCompleted === true && this.state.phoneNumberCompleted === true && this.state.descriptionCompleted === true && this.state.imgCompleted === true) {
            const data = {
                Title: this.state.Title,
                Description: this.state.Description,
                TypeofAp: this.state.TypeOfAp,
                Address: this.state.Address,
                Price: this.state.Price,
                PhoneNumber: this.state.PhoneNumber,
                //img1 : imgs
            }
            // console.log(data.img1);
            // console.log(this.state.img1);
            // data.img1.append('file',this.state.img1);
            // console.log(data.img1);
            console.log(data);
            axios.post('http://localhost:3001/api/post', {
                body: data
            });
            const imgs = new FormData();
            for (var x = 0; x < this.state.img1.length; x++) {
                imgs.append('file', this.state.img1[x]);
            }
            axios.post('http://localhost:3001/api/image', imgs, {})
                .then(res => { console.log(res.statusText) });
            this.setState({
                errAlert:false,
                closePopup:true
            })
        }
        else {
            this.setState({
                errMsg: "Trebuie completate toate campurile!",
                errAlert: true
            })
        }
    }
    handleChange(e) {
        // console.log(type);
        if (e.target.name === "title") {
            if (e.target.value.length <= 5) {
                this.setState({
                    errMsg: "Titlul trebuie sa aiba peste 5 caractere!",
                    titleCompleted: false,
                    errAlert: true
                })
                console.log(this.state.errMsg);
            }
            else if (e.target.value.length > 100) {
                this.setState({
                    errMsg: "Titlul nu trebuie sa aiba peste 100 caractere!",
                    titleErr: true,
                    errAlert: true
                })
            }
            else {
                this.setState({
                    Title: e.target.value,
                    titleCompleted: true,
                    errAlert: false
                })
                console.log(this.state.Title);
            }
        }
        else if (e.target.name === "type") {
            this.setState({
                TypeOfAp: e.target.value,
                typeCompleted: true
            })
        }
        else if (e.target.name === "address") {
            if (e.target.value.length>50) {
                this.setState({
                    errMsg: "Adresa trebuie sa contina mai putin de 50 de caractere",
                    addressCompleted: false,
                    errAlert: true
                })

            }
            else {
                this.setState({
                    Address: e.target.value,
                    addressCompleted: true,
                    errAlert:false
                })
            }
            
        }
        else if (e.target.name === "phoneNumber") {
            var numbers = /^[0-9]+$/;
            if (!e.target.value.match(numbers)) {
                this.setState({
                    errMsg: "Numarul de telefon trebuie sa contina doar cifre",
                    phoneNumberCompleted: false,
                    errAlert: true
                })

            }
            else {
                this.setState({
                    PhoneNumber: e.target.value,
                    phoneNumberCompleted: true,
                    errAlert: false
                })
            }
        }
        else if (e.target.name === "price") {
            var numbers = /^[0-9]+$/;
            if (!e.target.value.match(numbers)) {
                this.setState({
                    errMsg: "Pretul trebuie sa contina doar cifre",
                    priceCompleted: false,
                    errAlert: true
                })

            }
            else {
                this.setState({
                    Price: e.target.value,
                    priceCompleted: true,
                    errAlert: false

                })
            }
        }
        else if (e.target.name === "description") {
            if (e.target.value.length < 10) {
                this.setState({
                    errMsg: "Descrierea trebuie sa aiba mai mult de 10 caractere!",
                    descriptionCompleted: false,
                    errAlert: true
                })
            }
            else if (e.target.value.length > 500) {
                this.setState({
                    errMsg: "Descrierea trebuie sa aiba mai putin de 500 caractere!",
                    descriptionCompleted: false,
                    errAlert: true
                })
            }
            else {
                this.setState({
                    Description: e.target.value,
                    descriptionCompleted: true,
                    errAlert: false
                })
            }
        }
        else if (e.target.name === "file") {
            if (e.target.files.length < 2) {
                this.setState({
                    errMsg: "Trebuie introduse minim 2 fotografii!",
                    imgCompleted: false,
                    errAlert: true
                })
            }
            else {
                let ok = 0;
                console.log(e.target.files);
                for (var x = 0; x < e.target.files.length; x++) {
                    if (e.target.files[x].type != "image/png" && e.target.files[x].type != "image/jpeg" && e.target.files[x].type != "image/jpg") {
                        ok = 1; break;
                    }
                }
                if (ok == 1) {
                    this.setState({
                        errMsg: "Imaginea trebuie sa fie fie png fie jpg!",
                        imgCompleted: false,
                        errAlert: true
                    })
                }
                else {
                    this.setState({
                        img1: e.target.files,
                        loaded: 0,
                        imgCompleted: true,
                        errAlert: false
                    })
                }
            }
        }
    }
    render() {
        let alert;
        let popup;
        if (this.state.errAlert === true) {
            alert = <div className="err"><i className="fa fa-times-circle"></i>{this.state.errMsg}</div>
        }
        if(this.state.closePopup === true) {
            popup = <div>{this.props.closePopup}</div>
        }
        return (
            <div className="popup">
                {alert}
                <form className="innerPopup" onSubmit={this.handleSubmit} >
                    <div className="topPopup">
                        <p className="formTitle">Add announce</p>
                        <p className="closeButton" onClick={this.props.closePopup}></p>
                    </div>
                    <div className="topForm">
                        <input type="text" name="title" placeholder="title" className="addTitle" onChange={this.handleChange} />
                        <div className="topFormBody">
                            <div className="type">
                                <p className="typeTitle">Type of apartment</p>
                                <select name="type" className="types" onChange={this.handleChange}>
                                    <option value="selectOne">Select one</option>
                                    <option value="1room">1 room</option>
                                    <option value="2rooms">2 rooms</option>
                                    <option value="3rooms">3 rooms</option>
                                    <option value="4rooms">4 rooms</option>
                                    <option value="more">more</option>
                                </select>
                            </div>
                            <input type="text" name="address" placeholder="address" className="address" onChange={this.handleChange} />
                            <input type="text" name="phoneNumber" placeholder="phone number" className="phone" onChange={this.handleChange} />
                            <input type="text" name="price" placeholder="price" className="price" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="midForm">
                        <p className="uploadImg">Upload Images</p>
                        <input type="file" name="file" multiple onChange={this.handleChange}></input>
                    </div>
                    <div className="bottomForm">
                        <input type="text" name="description" placeholder="description" className="bottomInput" onChange={this.handleChange} />
                        <input type="submit" value="Submit" className="submit">{popup}</input>
                    </div>
                </form>
            </div>
        )
    }
}

export default class Button extends React.Component {
    constructor() {
        super();
        this.state = {
            showPopup: false
        };
    }
    seePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }
    render() {
        return (
            <div className="addAdButton">
                <button className="addAd" onClick={this.seePopup.bind(this)}>Add Ad</button>
                {this.state.showPopup ?
                    <Popup
                        closePopup={this.seePopup.bind(this)}
                    />
                    : null
                }
            </div>
        )
    }
}