import React from 'react';
import { PageHeader } from 'antd';
import './MainHeader.css'

class MainHeader extends React.Component {
    render() {
        return (
            <PageHeader
                className="site-page-header"
                onBack={() => null}
                //title="物联网应用平台"
                //subTitle="This is a subtitle"
            />
        );
    }
}
export default MainHeader;