import Title from "antd/lib/typography/Title";
import React from "react";
import { InputNumber, Form, Button, Checkbox } from "antd";
// import '../styles/ObserverInfo.css'

const ObserverInfo = (props) => {
  const {curLon, curLa, initialValues, setInitialValues, locationAvailable } = props;
  const onFormFinish = (observerInfo) => {
    observerInfo = {...initialValues}
    props.findSatellitesOnClick(observerInfo);
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 24 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const onChangeHandler = (e, name) => {
    setInitialValues({ ...initialValues, [name]: e })
  }
  const autoFillLocation = (checked) => {
    let curLocation = { "longitude": curLon, "latitude": curLa };
    if (checked) {
      console.log(curLocation);
    } else {
      curLocation["longitude"] = 0;
      curLocation["latitude"] = 0;
    }
    setInitialValues({ ...initialValues,...curLocation })
  }

  return (
    <div className="observer-info-container">
      <Title level={5}>Observer Info</Title>
      <Checkbox disabled={!locationAvailable} style={{ margin: "10px", color: "rgb(54, 42, 88)" }} 
        onChange={(e) => autoFillLocation(e.target.checked)} >Use Your Own Location
      </Checkbox>
      <Form
        {...layout}
        initialValues={initialValues}
        onFinish={onFormFinish}
      >
        <Form.Item
          label="Longitude"
          name="longitude"
          rules={[{ 
            required: true,
            message: 'Please enter a valid longitude!',
          }]}
        >
          <InputNumber min={-180} max={180} style={{ width: "40%" }} disabled={props.disabled} 
          value={initialValues.longitude} onChange={(e) => onChangeHandler(e, "longitude")}/>
          {true ? null : <Checkbox disabled={true} style={{ marginLeft: "5px" }}></Checkbox>}
        </Form.Item>

        <Form.Item
          label="Latitude"
          name="latitude"
          rules={[{ 
            required: true,
            message: 'Please enter a valid latitude!',
          }]}
        >
          <InputNumber min={-90} max={90} style={{ width: "40%" }} disabled={props.disabled} 
          value={initialValues.latitude} onChange={(e) => onChangeHandler(e, "latitude")}/>
          {true ? null : <Checkbox disabled={true} style={{ marginLeft: "5px" }}  ></Checkbox>}
        </Form.Item>

        <Form.Item
          label="Altitude(meters)"
          name="altitude"
          rules={[{ 
            required: true,
            message: 'Please enter a valid altitude!',
          }]}
        >
          <InputNumber min={-413} max={8850} style={{ width: "40%" }} disabled={props.disabled} value={initialValues.altitude} onChange={(e) => onChangeHandler(e, "altitude")}/>
        </Form.Item>

        <Form.Item
          label="Radius"
          name="radius"
          rules={[{ 
            required: true,
            message: 'Please enter a valid radius!',
          }]}
        >
          <InputNumber min={0} max={90} style={{ width: "40%" }} disabled={props.disabled} value={initialValues.radius} onChange={(e) => onChangeHandler(e, "radius")}/>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" disabled={props.loading || props.disabled}>
            Find nearby satellites
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ObserverInfo;