import React from 'react';
import { Layout, Row, Col, Button, Icon} from 'antd';
import './index.scss';
import Menu from '../menu';

const {
  Header, Content,Sider,
} = Layout;

export default class Lay extends React.Component{
    render(){
        return(
            <Layout>
            <Sider className='layout-sider'>
                <Menu/>
            </Sider>
            <Layout className='layout-layout'>
              <Header className='layout-header'>
                <Row type="flex" justify="end">
                    <Col span={4} style={{textAlign: 'center'}}>
                    <Button shape='circle' type='danger' icon='poweroff' style={{marginRight: 10}}></Button>
                    <Icon type='user' style={{marginRight:5}}/><span>骨架终结者</span>
                    </Col>
                </Row>
              </Header>
              <Content className='layout-content'>
                {this.props.children}
              </Content>
            </Layout>
          </Layout>
        )
    }
}