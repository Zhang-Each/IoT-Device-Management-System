import React from 'react';
import { Pie } from '@ant-design/charts';
import axios from "axios";

const server = "http://127.0.0.1:8080";

export default class DevicePieDiagram extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          pie: []
        };
        let user = localStorage.getItem("user");
        axios.get(server + "/device/statistic/" + user).then(response => {
            this.setState({
                pie: response.data
            })
            console.log(this.state.pie)
        })
    }

    render() {
        var config = {
            appendPadding: 10,
            data: this.state.pie,
            angleField: 'value',
            colorField: 'type',
            radius: 0.8,
            label: {
                type: 'outer',
                content: '{name} {percentage}',
            },
            interactions: [{ type: 'pie-legend-active' }, { type: 'element-active' }],
        };
        return (
            <div>
                <Pie {...config} />
            </div>
        );
    }
}