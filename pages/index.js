import Head from "next/head";
import * as Popover from "@radix-ui/react-popover";
import * as Toolbar from "@radix-ui/react-toolbar";
import * as Tooltip from "@radix-ui/react-tooltip";
import styles from "../styles/Home.module.css";
import { useState } from "react";

const rand = (digits) => Math.random().toFixed(digits);
const parseFloor = (num) => parseFloat(Math.floor(num));

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [globes, setGlobes] = useState([]);
  const [bg, setBG] = useState("#FFFFFF");

  const removeGlobe = (i) => {
    setGlobes([...globes.slice(0, i), ...globes.slice(i + 1)]);
  };

  const addGlobe = () => {
    const newGlobe = {
      id: Date.now(),
      x: parseFloor(rand(2) * 100),
      y: parseFloor(rand(2) * 100),
      radius: parseFloor(rand(2) * 1000),
      spread: parseFloor(rand(2) * 100),
      h: parseFloor(rand(2) * 360),
      s: parseFloor(rand(2) * 100),
      l: parseFloor(rand(2) * 100),
      a: rand(2),
    };
    console.log({ newGlobe });
    setGlobes(globes.concat(newGlobe));
  };

  const updateGlobe = (i, prop, value) => {
    const newGlobes = [...globes];
    newGlobes[i][prop] = value;
    setGlobes(newGlobes);
  };

  const background = () => {
    const style = ``;
    // background: radial-gradient(circle at 100%, #333, #333 50%, #eee 75%, #333 75%);

    globes.forEach((globe, i) => {
      style = style.concat(
        `${i !== 0 ? "," : ""}radial-gradient(${globe.radius}px at ${
          globe.x
        }% ${globe.y}%, hsla(${globe.h}, ${globe.s}%, ${globe.l}%, ${
          globe.a
        }) 0%, hsla(${globe.h}, ${globe.s}%, ${globe.l}%, 0) ${globe.spread}%)`
      );
    });
    console.log({ style });
    return style.concat(bg);
  };

  return (
    <div
      style={{
        background: background(),
      }}
    >
      <Tooltip.Provider>
        <Head>
          <title>Gradient Generator</title>
          <meta
            name="description"
            content="Generate gradients for backgrounds"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <div className={styles.sidebar}>
            <Toolbar.Root orientation={"vertical"}>
              <div className={styles.flexRow}>
                <labell htmlFor="bg-input">Set background</labell>
                <input
                  id="bg-input"
                  value={bg}
                  onChange={(e) => setBG(e.target.value)}
                />
              </div>
              <div className={styles.flexRow}>
                <button onClick={addGlobe}>Add +</button>
              </div>

              {globes.length > 0 && (
                <ul className={styles.globes}>
                  {globes.map((globe, i) => {
                    const color = `hsla(${globe.h}, ${globe.s}%, ${globe.l}%, ${globe.a})`;
                    return (
                      <li key={globe.id}>
                        {i !== 0 && (
                          <Toolbar.Separator
                            style={{
                              height: 1,
                              margin: "10px 0",
                              backgroundColor: `rgba(0,0,0, .3)`,
                            }}
                          />
                        )}
                        <div className={styles.flexRow}>
                          <span>
                            x:{" "}
                            <input
                              className={styles.input}
                              value={globe.x}
                              onChange={(e) =>
                                updateGlobe(i, "x", e.target.value)
                              }
                            />
                          </span>
                          <span>
                            y:{" "}
                            <input
                              className={styles.input}
                              value={globe.y}
                              onChange={(e) =>
                                updateGlobe(i, "y", e.target.value)
                              }
                            />
                          </span>
                        </div>
                        <div className={styles.flexRow}>
                          <span>
                            radius:{" "}
                            <input
                              className={styles.input}
                              value={globe.radius}
                              onChange={(e) =>
                                updateGlobe(i, "radius", e.target.value)
                              }
                            />
                          </span>
                          <span>
                            spread:{" "}
                            <input
                              className={styles.input}
                              value={globe.spread}
                              onChange={(e) =>
                                updateGlobe(i, "spread", e.target.value)
                              }
                            />
                          </span>
                        </div>

                        <div className={styles.colorRow}>
                          <span>{color}</span>
                          <span
                            style={{
                              width: 26,
                              height: 26,
                              display: "inline-block",
                              backgroundColor: color,
                              margin: `0 0 0 5px`,
                              borderRadius: 3,
                              border: "solid 1px rgba(0,0,0,.2)",
                            }}
                          ></span>
                        </div>

                        <div className={styles.flexRow}>
                          <span>
                            hue:{" "}
                            <input
                              className={styles.input}
                              value={globe.h}
                              onChange={(e) =>
                                updateGlobe(i, "h", e.target.value)
                              }
                            />
                          </span>
                          <span>
                            saturation:{" "}
                            <input
                              className={styles.input}
                              value={globe.s}
                              onChange={(e) =>
                                updateGlobe(i, "s", e.target.value)
                              }
                            />
                          </span>
                        </div>
                        <div className={styles.flexRow}>
                          <span>
                            lightness:{" "}
                            <input
                              className={styles.input}
                              value={globe.l}
                              onChange={(e) =>
                                updateGlobe(i, "l", e.target.value)
                              }
                            />
                          </span>
                          <span>
                            alpha:{" "}
                            <input
                              className={styles.input}
                              value={globe.a}
                              onChange={(e) =>
                                updateGlobe(i, "a", e.target.value)
                              }
                            />
                          </span>
                        </div>
                        <div>
                          <button onClick={(e) => removeGlobe(i)}>
                            Remove
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </Toolbar.Root>
          </div>
        </main>
      </Tooltip.Provider>
    </div>
  );
}
