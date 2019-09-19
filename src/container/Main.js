import React, { Component } from 'react';
import axios from 'axios';

import Header from '../component/Header';
import Gnb from '../component/Gnb';
import Footer from '../component/Footer';
import WebtoonList from '../component/WebtoonList';

class Main extends Component {
    constructor(props) {
        super(props);

        const query = new URLSearchParams(props.location.search);
        const day = query.get('day');


        this.state = {
            day: day || 'mon', // 디폴트 월요일
            webtoonList: []
        }
    }

    componentDidMount() {
        this._getList();
    }

    _getList = () => {
        const apiUrl = 'data/webtoon_list.json';

        axios.get(apiUrl)
            .then(data => {
                // 가지고 온 데이터를 state 저장
                this.setState({
                    webtoonList: data.data.webtoonList
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    componentDidUpdate(prevProps) {
        //요일이 바뀌면 다시 setState 처리 
        let prevQuery = new URLSearchParams(prevProps.location.search); 
        let prevDay = prevQuery.get('day'); 
        let query = new URLSearchParams(this.props.location.search); 
        let day = query.get('day'); 
        if (prevDay !== day) {
            this.setState({ day }) 
        };
    }

    render() {
        return (
            <div>
                <Header />
                <Gnb day={this.state.day} />
                
                {this.state.webtoonList.length > 0 ? (
                    <WebtoonList 
                        list={
                            this.state.webtoonList.filter(webtoon => (webtoon.day === this.state.day))
                        } 
                    />
                ) : (
                    <span>Loading ...</span>
                )}

                <Footer />
            </div>
        );
    }
}

export default Main;