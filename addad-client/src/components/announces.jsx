import React from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class Accordion extends React.Component {
    constructor() {
        super();
        this._handleClick = this._handleClick.bind(this);

    }

    componentDidMount() {
        this._handleClick();
    }

    _handleClick() {
        const acc = this._acc.children;
        for (let i = 0; i < acc.length; i++) {
            let a = acc[i];
            a.onclick = () => a.classList.toggle("active");
        }
    }

    render() {
        return (
            <div
                ref={a => this._acc = a}
                onClick={this._handleClick}>
                {this.props.children}
            </div>
        )
    }
}
export default class Announces extends React.Component {
    constructor() {
        super();
        this.state = {
            data: null,
            open: false,
            IMAGES: null,
            photoIndex: 0
        }
    }

    componentDidMount = () => {
        fetch('http://localhost:3001/api/get')
            .then(response => response.json())
            .then(data => this.setState({ data: data.data }));
    }

    render() {
        if (this.state.data) {
            const {photoIndex} = this.state;
            console.log(this.state.data);
            for (var date in this.state.data) {
                for (var imgs in this.state.data[date].img) {
                    this.state.data[date].img[imgs] = "./" + this.state.data[date].img[imgs];
                }
            }

            console.log(this.state.data.IMAGES);
            return (
                
                <div className="announces">
                    <Accordion>
                        {
                            this.state.data.map((item, index) => {
                                return (
                                    <div key={item._id} className="add">
                                        <div className="image">
                                        <img src={item.img[0]} className="cardImg"></img>

                                        <p key={item._id} onClick={() => {this.setState({ ...this.state,open: true }) }} className="photo">Click here to see the images</p>
                                        {
                                            this.state.open && (
                                                <Lightbox
                                                    mainSrc={item.img[photoIndex]}
                                                    nextSrc={item.img[(photoIndex + 1) % item.img.length]}
                                                    prevSrc={item.img[(photoIndex + item.img.length - 1) % item.img.length]}
                                                    onCloseRequest={() => this.setState({ open: false })}
                                                    onMovePrevRequest={() =>
                                                        this.setState({
                                                            ...this.state,
                                                            photoIndex: (photoIndex + item.img.length - 1) % item.img.length,
                                                        })
                                                    }
                                                    onMoveNextRequest={() =>
                                                        this.setState({
                                                            ...this.state,
                                                            photoIndex: (photoIndex + 1) % item.img.length,
                                                        })
                                                    }
                                                />
                                            )
                                        }
                                        </div>
                                        <div className="adDetails">
                                            <p className="cardTitle">{item.Title}</p>
                                            <div className="cardInfos">
                                                <div className="cardInfo1">
                                                    <p className="cardPrice"><b>Price:</b> {item.Price} euro</p>
                                                    <p className="cardType"><b>Number of rooms:</b> {item.TypeOfAp}</p>
                                                </div>
                                                <p className="cardAddress"><b>Address:</b> {item.Address}</p>
                                            </div>
                                            <p className="cardDescription">{item.Description}</p>
                                            <div className="cardBottom">
                                                <p className="seeMore">Click to read more</p>
                                                <p className="seeLess">Click to read less</p>
                                                <p className="cardPhoneNumber">PhoneNumber: {item.PhoneNumber}</p>

                                            </div>
                                        </div>
                                    </div>

                                )
                            })
                        }
                    </Accordion >
                </div>
            )
        }
        else {
            return (
                <div className="announces">
                    <p className="noAdd">No announce</p>
                </div>
            )
        }
    }
}
