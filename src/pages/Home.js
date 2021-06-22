import React, { Component } from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import Services from "../components/Services";
import FeaturedRoom from "../components/FeaturedRoom";

export default class Home extends Component {
  render() {
    return (
      <>
        <Hero>
          <Banner
            title="Luxurious Rooms"
            subtitle="Delux rooms starting at$188"
          >
            <Link to="/rooms" className="btn-primary">
              {" "}
              All rooms
            </Link>
          </Banner>
        </Hero>
        <Services />
        <FeaturedRoom />
      </>
    );
  }
}
