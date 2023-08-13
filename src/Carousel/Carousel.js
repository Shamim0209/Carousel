import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import "./Carousel.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function CarouselItem(props) {
  return (
    <div className="carousel-item">
      <img src={props.imageUrl} alt={`Nature Image ${props.index}`} />
    </div>
  );
}

const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        updateIndex(activeIndex + 1);
      }
    }, 2500);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [paused, activeIndex]);

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1),
  });

  return (
    <div
      {...handlers}
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="side-button left"
        onClick={() => updateIndex(activeIndex - 1)}
      >
        <ArrowBackIosNewIcon />
      </div>
      <div
        className="inner"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, { width: "100%" });
        })}
      </div>
      <div
        className="side-button right"
        onClick={() => updateIndex(activeIndex + 1)}
      >
        <ArrowForwardIosIcon />
      </div>
      <div className="indicators">
        {React.Children.map(children, (child, index) => {
          return (
            <button
              className={`${index === activeIndex ? "active" : ""}`}
              onClick={() => {
                updateIndex(index);
              }}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export { Carousel, CarouselItem };
