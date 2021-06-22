import React, { Component } from "react";
// import items from "./data";
import Client from "./Contenful";

const RoomContext = React.createContext();
//new we have access to provider and consumer

export default class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minprice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  };
  //get data fn

  getData = async () => {
    try {
      let response = await Client.getEntries({
        content_type: "bookingHotel",
        // order: "sys.createAt",
        order: "fields.price"
      });
      let rooms = this.formatData(response.items);
      console.log(rooms);
      let featuredRooms = rooms.filter((room) => room.featured === true);
      let maxPrice = Math.max(...rooms.map((item) => item.price));
      let maxSize = Math.max(...rooms.map((item) => item.size));
      this.setState({
        rooms,
        featuredRooms,
        sortedRooms: rooms,
        loading: false,
        price: maxPrice,
        maxPrice,
        maxSize,
      });
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount() {
    this.getData();
  }
  formatData(items) {
    let tempItems = items.map((item) => {
      let id = item.sys.id;
      let images = item.fields.images.map((image) => image.fields.file.url);
      let room = {
        ...item.fields,
        images,
        id,
      };
      return room;
    });
    return tempItems;
  }
  getRoom = (slug) => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find((room) => room.slug === slug);
    return room;
  };

  handleChange = (e) => {
    const target = e.target;
    const name = e.target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState(
      {
        [name]: value,
      },
      this.filterRooms
    );
  };
  filterRooms = () => {
    let { rooms, type, capacity, price, minSize, maxSize, breakfast, pets } =
      this.state;
    let tempRooms = [...rooms];
    // transforming the values we geting as string from capacity filtering into an number
    capacity = parseInt(capacity);

    //filtering by type
    if (type !== "all") {
      tempRooms = tempRooms.filter((room) => room.type === type);
    }

    //filtering by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter((room) => room.capacity >= capacity);
    }
    //filtering by price
    tempRooms = tempRooms.filter((room) => room.price <= price);
    //fillter size
    tempRooms = tempRooms.filter(
      (room) => room.size >= minSize && room.size <= maxSize
    );
    //filltering breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter((room) => room.breakfast === true);
    }
    //filtering pets
    if (pets) {
      tempRooms = tempRooms.filter((room) => room.pets === true);
    }
    this.setState({
      sortedRooms: tempRooms,
    });
  };
  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange,
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {(value) => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}

export { RoomProvider, RoomConsumer, RoomContext };
