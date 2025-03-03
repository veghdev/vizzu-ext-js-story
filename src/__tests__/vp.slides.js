import { dataAssets } from "./assets/chart-params/data.js";
import { styleAssets } from "./assets/chart-params/style.js";

import { waitForSlidesToBeSet } from "./assets/slides/asset-functions.js";

import { zeroSlide } from "./assets/slides/zero-slide.js";
import { slidesWithOneSlideWithOneEmptyStep } from "./assets/slides/one-slide-one-empty-step.js";
import { slidesWithOneSlideWithOneStep } from "./assets/slides/one-slide-one-step.js";
import { slideWithMoreSteps } from "./assets/slides/one-slide-more-steps.js";
import { slidesWithMoreSlides } from "./assets/slides/more-slides.js";

import VizzuPlayer from "../vizzu-player.js";

import lodashClonedeep from "lodash.clonedeep";

describe("if vp.slides setter is called", () => {
  const shouldBeEmpty = "getter should return an empty list";
  const shouldBeExpected = "getter should return the expected slides";

  let vp;

  beforeEach(() => {
    vp = new VizzuPlayer();
  });

  describe("with zero slide", () => {
    test(`${shouldBeEmpty}`, () => {
      vp.slides = lodashClonedeep(zeroSlide.input);
      return vp.connectedCallback().then(() => {
        return waitForSlidesToBeSet(vp, 5000).then(() => {
          expect(vp.slides).toStrictEqual(zeroSlide.expected);
        });
      });
    });

    test(`and initial data, ${shouldBeEmpty}`, () => {
      const modifiedInput = lodashClonedeep(zeroSlide.input);
      modifiedInput.data = dataAssets.dataInit;
      vp.slides = modifiedInput;
      return vp.connectedCallback().then(() => {
        return waitForSlidesToBeSet(vp, 5000).then(() => {
          expect(vp.slides).toStrictEqual(zeroSlide.expected);
        });
      });
    });

    test(`and initial style, ${shouldBeEmpty}`, () => {
      const modifiedInput = lodashClonedeep(zeroSlide.input);
      modifiedInput.style = styleAssets.styleInit;
      vp.slides = modifiedInput;
      return vp.connectedCallback().then(() => {
        return waitForSlidesToBeSet(vp, 5000).then(() => {
          expect(vp.slides).toStrictEqual(zeroSlide.expected);
        });
      });
    });

    test(`and initial data and style, ${shouldBeEmpty}`, () => {
      const modifiedInput = lodashClonedeep(zeroSlide.input);
      modifiedInput.data = dataAssets.dataInit;
      modifiedInput.style = styleAssets.styleInit;
      vp.slides = modifiedInput;
      return vp.connectedCallback().then(() => {
        return waitForSlidesToBeSet(vp, 5000).then(() => {
          expect(vp.slides).toStrictEqual(zeroSlide.expected);
        });
      });
    });
  });

  describe("with one slide", () => {
    describe("with one empty step", () => {
      test.each(slidesWithOneSlideWithOneEmptyStep)(
        `($description), ${shouldBeExpected}`,
        ({ description, input, expected }) => {
          vp.slides = lodashClonedeep(input);
          return vp.connectedCallback().then(() => {
            return waitForSlidesToBeSet(vp, 5000).then(() => {
              expect(vp.slides).toStrictEqual(expected);
            });
          });
        }
      );

      test.each(slidesWithOneSlideWithOneEmptyStep)(
        `and initial data ($description), ${shouldBeExpected}`,
        ({ description, input, expected }) => {
          const modifiedInput = lodashClonedeep(input);
          modifiedInput.data = dataAssets.dataInit;
          const modifiedExpected = lodashClonedeep(expected);
          modifiedExpected[0][0][0].target.data = dataAssets.dataInit;
          vp.slides = modifiedInput;
          return vp.connectedCallback().then(() => {
            return waitForSlidesToBeSet(vp, 5000).then(() => {
              expect(vp.slides).toStrictEqual(modifiedExpected);
            });
          });
        }
      );

      test.each(slidesWithOneSlideWithOneEmptyStep)(
        `and initial style ($description), ${shouldBeExpected}`,
        ({ description, input, expected }) => {
          const modifiedInput = lodashClonedeep(input);
          modifiedInput.style = styleAssets.styleInit;
          const modifiedExpected = lodashClonedeep(expected);
          modifiedExpected[0][0][0].target.style = styleAssets.styleInit;
          vp.slides = modifiedInput;
          return vp.connectedCallback().then(() => {
            return waitForSlidesToBeSet(vp, 5000).then(() => {
              expect(vp.slides).toStrictEqual(modifiedExpected);
            });
          });
        }
      );

      test.each(slidesWithOneSlideWithOneEmptyStep)(
        `and initial data and style ($description), ${shouldBeExpected}`,
        ({ description, input, expected }) => {
          const modifiedInput = lodashClonedeep(input);
          modifiedInput.data = dataAssets.dataInit;
          modifiedInput.style = styleAssets.styleInit;
          const modifiedExpected = lodashClonedeep(expected);
          modifiedExpected[0][0][0].target.data = dataAssets.dataInit;
          modifiedExpected[0][0][0].target.style = styleAssets.styleInit;
          vp.slides = modifiedInput;
          return vp.connectedCallback().then(() => {
            return waitForSlidesToBeSet(vp, 5000).then(() => {
              expect(vp.slides).toStrictEqual(modifiedExpected);
            });
          });
        }
      );
    });

    describe("with one step", () => {
      test.each(slidesWithOneSlideWithOneStep)(
        `step contains $description (object step), ${shouldBeExpected}`,
        ({ description, input, expected }) => {
          vp.slides = lodashClonedeep(input);
          return vp.connectedCallback().then(() => {
            return waitForSlidesToBeSet(vp, 5000).then(() => {
              expect(vp.slides).toStrictEqual(expected);
            });
          });
        }
      );

      test.each(slidesWithOneSlideWithOneStep)(
        `step contains $description (list step), ${shouldBeExpected}`,
        ({ description, input, expected }) => {
          const modifiedInput = lodashClonedeep(input);
          modifiedInput.slides[0] = [modifiedInput.slides[0]];
          vp.slides = modifiedInput;
          return vp.connectedCallback().then(() => {
            return waitForSlidesToBeSet(vp, 5000).then(() => {
              expect(vp.slides).toStrictEqual(expected);
            });
          });
        }
      );

      test.each(slidesWithOneSlideWithOneStep)(
        `and initial data, step contains $description (object step), ${shouldBeExpected}`,
        ({ description, input, expected }) => {
          const modifiedInput = lodashClonedeep(input);
          modifiedInput.data = dataAssets.dataInit;
          const modifiedExpected = lodashClonedeep(expected);
          modifiedExpected[0][0][0].target.data = Object.assign(
            modifiedExpected[0][0][0].target.data,
            dataAssets.dataInit
          );
          vp.slides = modifiedInput;
          return vp.connectedCallback().then(() => {
            return waitForSlidesToBeSet(vp, 5000).then(() => {
              expect(vp.slides).toStrictEqual(modifiedExpected);
            });
          });
        }
      );

      test.each(slidesWithOneSlideWithOneStep)(
        `and initial data, step contains $description (list step), ${shouldBeExpected}`,
        ({ description, input, expected }) => {
          const modifiedInput = lodashClonedeep(input);
          modifiedInput.data = dataAssets.dataInit;
          modifiedInput.slides[0] = [modifiedInput.slides[0]];
          const modifiedExpected = lodashClonedeep(expected);
          modifiedExpected[0][0][0].target.data = Object.assign(
            modifiedExpected[0][0][0].target.data,
            dataAssets.dataInit
          );
          vp.slides = modifiedInput;
          return vp.connectedCallback().then(() => {
            return waitForSlidesToBeSet(vp, 5000).then(() => {
              expect(vp.slides).toStrictEqual(modifiedExpected);
            });
          });
        }
      );

      test.each(slidesWithOneSlideWithOneStep)(
        `and initial style, step contains $description (object step), ${shouldBeExpected}`,
        ({ description, input, expected }) => {
          const modifiedInput = lodashClonedeep(input);
          modifiedInput.style = styleAssets.styleInit;
          const modifiedExpected = lodashClonedeep(expected);
          if (!modifiedExpected[0][0][0].target.style) {
            modifiedExpected[0][0][0].target.style = styleAssets.styleInit;
          }
          vp.slides = modifiedInput;
          return vp.connectedCallback().then(() => {
            return waitForSlidesToBeSet(vp, 5000).then(() => {
              expect(vp.slides).toStrictEqual(modifiedExpected);
            });
          });
        }
      );

      test.each(slidesWithOneSlideWithOneStep)(
        `and initial style, step contains $description (list step), ${shouldBeExpected}`,
        ({ description, input, expected }) => {
          const modifiedInput = lodashClonedeep(input);
          modifiedInput.style = styleAssets.styleInit;
          modifiedInput.slides[0] = [modifiedInput.slides[0]];
          const modifiedExpected = lodashClonedeep(expected);
          if (!modifiedExpected[0][0][0].target.style) {
            modifiedExpected[0][0][0].target.style = styleAssets.styleInit;
          }
          vp.slides = modifiedInput;
          return vp.connectedCallback().then(() => {
            return waitForSlidesToBeSet(vp, 5000).then(() => {
              expect(vp.slides).toStrictEqual(modifiedExpected);
            });
          });
        }
      );

      test.each(slidesWithOneSlideWithOneStep)(
        `and initial data and style, step contains $description (object step), ${shouldBeExpected}`,
        ({ description, input, expected }) => {
          const modifiedInput = lodashClonedeep(input);
          modifiedInput.data = dataAssets.dataInit;
          modifiedInput.style = styleAssets.styleInit;
          const modifiedExpected = lodashClonedeep(expected);
          modifiedExpected[0][0][0].target.data = Object.assign(
            modifiedExpected[0][0][0].target.data,
            dataAssets.dataInit
          );
          if (!modifiedExpected[0][0][0].target.style) {
            modifiedExpected[0][0][0].target.style = styleAssets.styleInit;
          }
          vp.slides = modifiedInput;
          return vp.connectedCallback().then(() => {
            return waitForSlidesToBeSet(vp, 5000).then(() => {
              expect(vp.slides).toStrictEqual(modifiedExpected);
            });
          });
        }
      );

      test.each(slidesWithOneSlideWithOneStep)(
        `and initial data and style, step contains $description (list step), ${shouldBeExpected}`,
        ({ description, input, expected }) => {
          const modifiedInput = lodashClonedeep(input);
          modifiedInput.data = dataAssets.dataInit;
          modifiedInput.style = styleAssets.styleInit;
          modifiedInput.slides[0] = [modifiedInput.slides[0]];
          const modifiedExpected = lodashClonedeep(expected);
          modifiedExpected[0][0][0].target.data = Object.assign(
            modifiedExpected[0][0][0].target.data,
            dataAssets.dataInit
          );
          if (!modifiedExpected[0][0][0].target.style) {
            modifiedExpected[0][0][0].target.style = styleAssets.styleInit;
          }
          vp.slides = modifiedInput;
          return vp.connectedCallback().then(() => {
            return waitForSlidesToBeSet(vp, 5000).then(() => {
              expect(vp.slides).toStrictEqual(modifiedExpected);
            });
          });
        }
      );
    });

    describe("with more steps", () => {
      test(`${shouldBeExpected}`, () => {
        vp.slides = lodashClonedeep(slideWithMoreSteps.input);
        return vp.connectedCallback().then(() => {
          return waitForSlidesToBeSet(vp, 5000).then(() => {
            expect(vp.slides).toStrictEqual(slideWithMoreSteps.expected);
          });
        });
      });

      test(`and initial data, ${shouldBeExpected}`, () => {
        const modifiedInput = lodashClonedeep(slideWithMoreSteps.input);
        modifiedInput.data = dataAssets.dataInit;
        const modifiedExpected = lodashClonedeep(slideWithMoreSteps.expected);
        modifiedExpected[0][0][0].target.data = Object.assign(
          modifiedExpected[0][0][0].target.data,
          dataAssets.dataInit
        );
        vp.slides = modifiedInput;
        return vp.connectedCallback().then(() => {
          return waitForSlidesToBeSet(vp, 5000).then(() => {
            expect(vp.slides).toStrictEqual(modifiedExpected);
          });
        });
      });

      test(`and initial style, ${shouldBeExpected}`, () => {
        const modifiedInput = lodashClonedeep(slideWithMoreSteps.input);
        modifiedInput.style = styleAssets.styleInit;
        const modifiedExpected = lodashClonedeep(slideWithMoreSteps.expected);
        if (!modifiedExpected[0][0][0].target.style) {
          modifiedExpected[0][0][0].target.style = styleAssets.styleInit;
        }
        vp.slides = modifiedInput;
        return vp.connectedCallback().then(() => {
          return waitForSlidesToBeSet(vp, 5000).then(() => {
            expect(vp.slides).toStrictEqual(modifiedExpected);
          });
        });
      });

      test(`and initial data and style, ${shouldBeExpected}`, () => {
        const modifiedInput = lodashClonedeep(slideWithMoreSteps.input);
        modifiedInput.data = dataAssets.dataInit;
        modifiedInput.style = styleAssets.styleInit;
        const modifiedExpected = lodashClonedeep(slideWithMoreSteps.expected);
        modifiedExpected[0][0][0].target.data = Object.assign(
          modifiedExpected[0][0][0].target.data,
          dataAssets.dataInit
        );
        if (!modifiedExpected[0][0][0].target.style) {
          modifiedExpected[0][0][0].target.style = styleAssets.styleInit;
        }
        vp.slides = modifiedInput;
        return vp.connectedCallback().then(() => {
          return waitForSlidesToBeSet(vp, 5000).then(() => {
            expect(vp.slides).toStrictEqual(modifiedExpected);
          });
        });
      });
    });
  });

  describe("with more slides", () => {
    test.each(slidesWithMoreSlides)(
      `$description, ${shouldBeExpected}`,
      ({ description, input, expected }) => {
        const vp = new VizzuPlayer();
        vp.slides = lodashClonedeep(input);
        return vp.connectedCallback().then(() => {
          return waitForSlidesToBeSet(vp, 5000).then(() => {
            expect(vp.slides).toStrictEqual(expected);
          });
        });
      }
    );

    test.each(slidesWithMoreSlides)(
      `and initial data, $description, ${shouldBeExpected}`,
      ({ description, input, expected }) => {
        const vp = new VizzuPlayer();
        const modifiedInput = lodashClonedeep(input);
        modifiedInput.data = dataAssets.dataInit;
        const modifiedExpected = lodashClonedeep(expected);
        modifiedExpected[0][0][0].target.data = Object.assign(
          modifiedExpected[0][0][0].target.data,
          dataAssets.dataInit
        );
        vp.slides = modifiedInput;
        return vp.connectedCallback().then(() => {
          return waitForSlidesToBeSet(vp, 5000).then(() => {
            expect(vp.slides).toStrictEqual(modifiedExpected);
          });
        });
      }
    );

    test.each(slidesWithMoreSlides)(
      `and initial style, $description, ${shouldBeExpected}`,
      ({ description, input, expected }) => {
        const vp = new VizzuPlayer();
        const modifiedInput = lodashClonedeep(input);
        modifiedInput.style = styleAssets.styleInit;
        const modifiedExpected = lodashClonedeep(expected);
        if (!modifiedExpected[0][0][0].target.style) {
          modifiedExpected[0][0][0].target.style = styleAssets.styleInit;
        }
        vp.slides = modifiedInput;
        return vp.connectedCallback().then(() => {
          return waitForSlidesToBeSet(vp, 5000).then(() => {
            expect(vp.slides).toStrictEqual(modifiedExpected);
          });
        });
      }
    );

    test.each(slidesWithMoreSlides)(
      `and initial data and style, $description, ${shouldBeExpected}`,
      ({ description, input, expected }) => {
        const vp = new VizzuPlayer();
        const modifiedInput = lodashClonedeep(input);
        modifiedInput.data = dataAssets.dataInit;
        modifiedInput.style = styleAssets.styleInit;
        const modifiedExpected = lodashClonedeep(expected);
        modifiedExpected[0][0][0].target.data = Object.assign(
          modifiedExpected[0][0][0].target.data,
          dataAssets.dataInit
        );
        if (!modifiedExpected[0][0][0].target.style) {
          modifiedExpected[0][0][0].target.style = styleAssets.styleInit;
        }
        vp.slides = modifiedInput;
        return vp.connectedCallback().then(() => {
          return waitForSlidesToBeSet(vp, 5000).then(() => {
            expect(vp.slides).toStrictEqual(modifiedExpected);
          });
        });
      }
    );
  });
});
