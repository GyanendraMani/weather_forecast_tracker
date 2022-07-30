import React from "react";
import Title from "antd/lib/typography/Title";
import { List, Checkbox, Avatar } from "antd";
// import '../styles/SatelliteList.css'
import satelliteImage from '../../assets/satellite.svg';

const SatelliteList = ({
  satList,
  updateSatelliteList,
  loading,
  disabled
}) => {
  const onSelectionChange = (checked, targetSatllite) => {
    const nextSatlliteList = satList.map((satllite) => {
      if (satllite.satid === targetSatllite.satid) {
        return {
          ...satllite,
          selected: checked
        }
      }
      else {
        return {
          ...satllite
        }
      }
    });

    updateSatelliteList(nextSatlliteList);
  }

  return (
    <div className="satellite-list-container">
      <Title level={5}>Nearby Satellites ({satList? satList.length : 0})</Title>
      <p>Select the satellites you wanna track on the world map at the right side</p>
      <hr/>
      <List 
        className="sat-list"
        itemLayout="horizontal"
        dataSource={satList}
        loading={loading}
        renderItem={ item => (
            <List.Item 
              actions={[<Checkbox onChange={(e) => onSelectionChange(e.target.checked, item)} checked={item.selected} disabled={disabled} />]}>
                <List.Item.Meta
                  avatar={<Avatar src={satelliteImage} size="large" alt="satellite"/>}
                  title={<p>{item.satname}</p>}
                  description={`Launch Date: ${item.launchDate}`}
                />
            </List.Item>
        )}
      />
    </div>
  )
}

export default SatelliteList;