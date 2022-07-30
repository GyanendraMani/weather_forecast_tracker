
import React from 'react';
// import starlinkLogo from '../assets/starlink_logo.svg';
import { Layout } from 'antd';
import Main from './co-components/Main';

const { Header, Footer, Content } = Layout;

function Satellite() {
  return (
    <Layout>
      <Header>
        {/* <img src={starlinkLogo} className="App-logo" alt="logo" /> */}
        <p className="title">
        Track Satellites
        </p>
      </Header>
      <Content>
        <Main />
      </Content>
      <Footer >
        <span className = "annotation">@2022 Weather Tracker App. All Rights Reserved.</span>
      </Footer>
    </Layout>
  );
}

export default Satellite;