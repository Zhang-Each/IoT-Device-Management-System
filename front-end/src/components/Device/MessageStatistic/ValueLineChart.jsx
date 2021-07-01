import React from 'react';
import { Line } from '@ant-design/charts';
import axios from "axios";

const server = "http://127.0.0.1:8080";

export default class ValueLineChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data: []
        };
        let user = localStorage.getItem("user");
        axios.get(server + "/message/all/value/" + user).then(response => {
            this.setState({
                data: response.data
            })
            console.log(this.state.data);
        })
    }

    render() {
        const config = {
            title: {
                visible: true,
                text: '多折线图',
            },
            description: {
                visible: true,
                text: '通过回调函数指定折线颜色',
            },
            forceFit: true,
            data: this.state.data,
            xField: 'stamp',
            yField: 'value',
            yAxis: { label: { formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`) } },
            legend: { position: 'right-top' },
            seriesField: 'name',
            color: ['#1979C9', '#d62a0d', '#FAA219', 'rgba(48,245,4,0.61)'],
            responsive: true,
        };
        return (
            <div>
                <Line {...config} />
            </div>
        );
    }
};
