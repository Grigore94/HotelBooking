import React, { Component } from "react";
import Title from "./Title";
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa";

export default class Services extends Component {
  state = {
    services: [
      {
        icon: <FaCocktail />,
        title: "free cocktailes",
        info: "Lorem impusmafajfbakjbav vakvambv avkajvbakv a avkajbv.",
      },
      {
        icon: <FaHiking />,
        title: "Hiking",
        info: "Lorem impusmafajfbakjbav vakvambv avkajvbakv a avkajbv.",
      },
      {
        icon: <FaShuttleVan />,
        title: "free van rides",
        info: "Lorem impusmafajfbakjbav vakvambv avkajvbakv a avkajbv.",
      },
      {
        icon: <FaBeer />,
        title: "free beer",
        info: "Lorem impusmafajfbakjbav vakvambv avkajvbakv a avkajbv.",
      },
    ],
  };
  render() {
    // console.log(this.state);
    return (
      <section className="services">
        <Title title="services" />
        <div className="services-center">
          {this.state.services.map((item) => {
            return (
              <article key={`item-${item.title}`} className="service">
                <span>{item.icon}</span>
                <h6>{item.title}</h6>
                <p>{item.info}</p>
              </article>
            );
          })}
        </div>
      </section>
    );
  }
}
