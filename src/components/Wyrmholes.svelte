<script lang="ts">
  import { onMount } from "svelte/internal";
  import { Modal } from 'sveltestrap';
  import {
    getMultipleRandom,
    createDebuff,
    highJumpContainer,
    elusiveJumpContainer,
    spineshatterDiveContainer,
    diveFromGrace,
    makeTowerAtPos,
    isInside
  } from './scripts/utils';


  /**
   * State variables
   */
  let step = 1;
  let inLineGroups = { first: [], second: [], third: [] };
  let towerPositions = { first: [], second: [], third: [] };
  let castName: string;

  /**
   * Modal variables
   */
  let soakFailOpen = false;
  const toggleSoakFail = () => (soakFailOpen = !soakFailOpen);
  let diveOneFailOpen = false;
  const toggleDiveOneFail = () => (diveOneFailOpen = !diveOneFailOpen);
  let lashFailOpen = false;
  const toggleLashFail = () => (lashFailOpen = !lashFailOpen);
  let gnashFailOpen = false;
  const toggleGnashFail = () => (gnashFailOpen = !gnashFailOpen);
  let firstTowerSoakFailOpen = false;
  const toggleFirstTowerSoakFail = () => (firstTowerSoakFailOpen = !firstTowerSoakFailOpen);
  let diveTwoFailOpen = false;
  const toggleDiveTwoFail = () => (diveTwoFailOpen = !diveTwoFailOpen);
  let secondTowerSoakFailOpen = false;
  const toggleSecondTowerSoakFail = () => (secondTowerSoakFailOpen = !secondTowerSoakFailOpen);
  let soakFailTwoOpen = false;
  const toggleSoakTwoFail = () => (soakFailTwoOpen = !soakFailTwoOpen);
  let diveThreeFailOpen = false;
  const toggleDiveThreeFail = () => (diveThreeFailOpen = !diveThreeFailOpen);
  let thirdTowerSoakFailOpen = false;
  const toggleThirdTowerSoakFail = () => (thirdTowerSoakFailOpen = !thirdTowerSoakFailOpen);
  let notFinishedOpen = false;
  const toggleNotFinished = () => (notFinishedOpen = !notFinishedOpen);

  /**
   * Image sources
   */
  const boss = 'images/DefaultNpc.png';

  const failStep = () => {
    const currentStep = document.getElementById('currentStep');
    currentStep.className = "table-danger";
    document.getElementById('nextStepButton').setAttribute('disabled', 'true');
  }

  const inOutOne = () => {
    document.getElementById('bossCastbar').remove();
    let timeOuts = [];
    const party = [
      document.getElementById('tankOne').querySelector('.icon-sizing').getBoundingClientRect(),
      document.getElementById('tankTwo').querySelector('.icon-sizing').getBoundingClientRect(),
      document.getElementById('healerOne').querySelector('.icon-sizing').getBoundingClientRect(),
      document.getElementById('healerTwo').querySelector('.icon-sizing').getBoundingClientRect(),
      document.getElementById('meleeOne').querySelector('.icon-sizing').getBoundingClientRect(),
      document.getElementById('meleeTwo').querySelector('.icon-sizing').getBoundingClientRect(),
      document.getElementById('magicRanged').querySelector('.icon-sizing').getBoundingClientRect(),
      document.getElementById('physRanged').querySelector('.icon-sizing').getBoundingClientRect()
    ];

    const bossContainer = document.getElementById('bossContainer');
    const bossContainerPos = bossContainer.getBoundingClientRect();

    const elem = document.createElement('div');
    elem.className = 'position-absolute top-0';
    switch (castName) {
      case 'Gnash and Lash':
        const gnash = document.createElement('img');
        gnash.src = 'images/CircleAoe.gif';
        gnash.alt = 'gnash';
        elem.append(gnash);
        bossContainer.append(elem);

        for (let i = 0; i < party.length; i++) {
          if (isInside(bossContainerPos, party[i])) {
            failStep();
            toggleGnashFail();
            return;
          }
        }
        break;
      case 'Lash and Gnash':
        const lash = document.createElement('img');
        lash.src = 'images/Donut.gif';
        lash.alt = 'lash';
        lash.setAttribute('style', 'width: 30rem; height: 30rem; transform: translate(-25%, -25%)');
        elem.append(lash);
        bossContainer.append(elem);

        for (let i = 0; i < party.length; i++) {
          if (!(isInside(bossContainerPos, party[i]))) {
            failStep();
            toggleLashFail();
            return;
          }
        }
        break;
      default:
        break;
    }
    timeOuts.push(setTimeout(() => {
      elem.remove();
    }, 3000))
  }

  const inOutTwo = () => {
    let timeOuts = [];
    const party = [
      document.getElementById('tankOne').querySelector('.icon-sizing').getBoundingClientRect(),
      document.getElementById('tankTwo').querySelector('.icon-sizing').getBoundingClientRect(),
      document.getElementById('healerOne').querySelector('.icon-sizing').getBoundingClientRect(),
      document.getElementById('healerTwo').querySelector('.icon-sizing').getBoundingClientRect(),
      document.getElementById('meleeOne').querySelector('.icon-sizing').getBoundingClientRect(),
      document.getElementById('meleeTwo').querySelector('.icon-sizing').getBoundingClientRect(),
      document.getElementById('magicRanged').querySelector('.icon-sizing').getBoundingClientRect(),
      document.getElementById('physRanged').querySelector('.icon-sizing').getBoundingClientRect()
    ];

    const bossContainer = document.getElementById('bossContainer');
    const bossContainerPos = bossContainer.getBoundingClientRect();

    const elem = document.createElement('div');
    elem.className = 'position-absolute top-0';
    switch (castName) {
      case 'Lash and Gnash':
        const gnash = document.createElement('img');
        gnash.src = 'images/CircleAoe.gif';
        gnash.alt = 'gnash';
        elem.append(gnash);
        bossContainer.append(elem);

        for (let i = 0; i < party.length; i++) {
          if (isInside(bossContainerPos, party[i])) {
            failStep();
            toggleGnashFail();
            return;
          }
        }
        break;
      case 'Gnash and Lash':
        const lash = document.createElement('img');
        lash.src = 'images/Donut.gif';
        lash.alt = 'lash';
        lash.setAttribute('style', 'width: 30rem; height: 30rem; transform: translate(-25%, -25%)');
        elem.append(lash);
        bossContainer.append(elem);

        for (let i = 0; i < party.length; i++) {
          if (!(isInside(bossContainerPos, party[i]))) {
            failStep();
            toggleLashFail();
            return;
          }
        }
        break;
      default:
        break;
    }
    timeOuts.push(setTimeout(() => {
      elem.remove();
    }, 3000))
  }

  /**
   * 0:13 Dive from Grace (Markers go out)
   */
  const stepTwo = () => {
    let party = [
      document.getElementById('tankOne'),
      document.getElementById('tankTwo'),
      document.getElementById('healerOne'),
      document.getElementById('healerTwo'),
      document.getElementById('meleeOne'),
      document.getElementById('meleeTwo'),
      document.getElementById('magicRanged'),
      document.getElementById('physRanged')
    ];

    const firstMarkers = getMultipleRandom(party, 3);
    party = party.filter( ( el ) => !firstMarkers.includes( el ) );
    const secondMarkers = getMultipleRandom(party, 2);
    party = party.filter( ( el ) => !secondMarkers.includes( el ) );

    firstMarkers.forEach(char => {
      char.append(createDebuff('images/First_in_Line.png', 'first in line debuff'));
    });
    secondMarkers.forEach(char => {
      char.append(createDebuff('images/Second_in_Line.png', 'second in line debuff'));
    });
    party.forEach(char => {
      char.append(createDebuff('images/Third_in_Line.png', 'third in line debuff'));
    });

    inLineGroups = {
      first: firstMarkers,
      second: secondMarkers,
      third: party
    }
  };

  /**
   * 0:18 Dive from Grace (Debuffs go out)
   */
  const stepThree = () => {
    if ((Math.floor(Math.random() * 2)) === 0) {
      inLineGroups.first[0].append(createDebuff('images/High_Jump_Target.png', 'high jump target'));
      inLineGroups.first[1].append(createDebuff('images/Elusive_Jump_Target.png', 'elusive jump target'));
      inLineGroups.first[2].append(createDebuff('images/Spineshatter_Dive_Target.png', 'spineshatter dive target'));
    } else {
      inLineGroups.first.forEach(char => {
        char.append(createDebuff('images/High_Jump_Target.png', 'high jump target'));
      });
    }

    if ((Math.floor(Math.random() * 2)) === 0) {
      inLineGroups.second[0].append(createDebuff('images/Elusive_Jump_Target.png', 'elusive jump target'));
      inLineGroups.second[1].append(createDebuff('images/Spineshatter_Dive_Target.png', 'spineshatter dive target'));
    } else {
      inLineGroups.second.forEach(char => {
        char.append(createDebuff('images/High_Jump_Target.png', 'high jump target'));
      });
    }

    if ((Math.floor(Math.random() * 2)) === 0) {
      inLineGroups.third[0].append(createDebuff('images/High_Jump_Target.png', 'high jump target'));
      inLineGroups.third[1].append(createDebuff('images/Elusive_Jump_Target.png', 'elusive jump target'));
      inLineGroups.third[2].append(createDebuff('images/Spineshatter_Dive_Target.png', 'spinehsatter dive target'));
    } else {
      inLineGroups.third.forEach(char => {
        char.append(createDebuff('images/High_Jump_Target.png', 'high jump target'));
      });
    }
  };

  /**
   *0:27 Lash And Gnash & Gnash And Lash Cast (In/Out or Out/In)
   */
  const stepFour = () => {
    castName = Math.floor(Math.random() * 2) === 0 ? 'Lash and Gnash' : 'Gnash and Lash';

    const elem = document.createElement('div')
    elem.id = 'bossCastbar'

    const label = document.createElement('label')
    label.setAttribute('for', 'castBarContainer')
    label.textContent = castName

    const castBarContainer = document.createElement('div')
    castBarContainer.className = 'progress';
    castBarContainer.id = 'castBarContainer';

    const castBar = document.createElement('div')
    castBar.className = 'progress-bar progress-bar-striped bg-warning progress-bar-animated'
    castBar.setAttribute('role', 'progressbar')
    castBar.setAttribute('aria-valuenow', '69')
    castBar.setAttribute('aria-valuemin', '0')
    castBar.setAttribute('aria-valuemax', '100')
    castBar.setAttribute('style', 'width:69%')

    castBarContainer.append(castBar)
    elem.prepend(label)
    elem.append(castBarContainer)

    document.getElementById('bossContainer').append(elem)
  };

  /**
   * 0:28 First in line: High Jump & Eye of the Tyrant (Shared AoE)
   */
  const stepFive = () => {
    const sharedAoeTargets = [...inLineGroups.second, ...inLineGroups.third];
    const target = Math.floor(Math.random() * 4);

    const aoeContainer = document.createElement('div');
    aoeContainer.className = 'position-absolute top-50 left-50';
    aoeContainer.setAttribute('style', 'transform: translate(-37%, -57%); z-index: -1;');

    const sharedAoe = document.createElement('img');
    sharedAoe.src = 'images/Stack-Marker.gif';
    sharedAoe.setAttribute('alt', 'Eye of the Tyrant');
    sharedAoe.className = 'eye-of-the-tyrant';
    aoeContainer.append(sharedAoe);

    const aoeTarget = sharedAoeTargets[target]
    aoeTarget.append(aoeContainer);

    const aoePos = sharedAoe.getBoundingClientRect();
    aoePos.width = 256;
    aoePos.height = 256;
    const soakers = [
      inLineGroups.second[0].querySelector('.icon-sizing').getBoundingClientRect(),
      inLineGroups.second[1].querySelector('.icon-sizing').getBoundingClientRect(),
      inLineGroups.third[0].querySelector('.icon-sizing').getBoundingClientRect(),
      inLineGroups.third[1].querySelector('.icon-sizing').getBoundingClientRect(),
      inLineGroups.third[2].querySelector('.icon-sizing').getBoundingClientRect(),
    ];

    let positions = [];
    let timeouts = [];
    let diveOne: DOMRect;
    let diveTwo: DOMRect;
    let diveThree: DOMRect;

    const setDivePositions = (i: number, divePos: DOMRect) => {
      switch (i) {
        case 0:
          diveOne = divePos;
          break;
        case 1:
          diveTwo = divePos;
          break;
        case 2:
          diveThree = divePos;
          break;
      }
    };

    inLineGroups.first.forEach((char, i) => {
      const highJump = highJumpContainer();
      highJump.append(diveFromGrace());
      if ((char.lastElementChild as HTMLImageElement).alt === 'high jump target') {
        char.append(highJump);

        const jumpPos = highJump.getBoundingClientRect();
        jumpPos.height = 140;
        jumpPos.width = 140;
        positions.push(jumpPos)
        char.removeChild(char.children[1]);
        char.removeChild(char.children[1]);
        char.append(createDebuff('images/Fire_Resistance_Down.png', 'fire resistance down'));

        const divePos = highJump.getBoundingClientRect();
        setDivePositions(i, divePos);

        timeouts.push(setTimeout(() => {
          highJump.remove();
          makeTowerAtPos(jumpPos.left, jumpPos.top);
        }, 3000));
      }
      if ((char.lastElementChild as HTMLImageElement).alt === 'elusive jump target') {
        const elusiveJump = elusiveJumpContainer();
        elusiveJump.append(diveFromGrace());
        char.append(elusiveJump);

        const jumpPos = elusiveJump.getBoundingClientRect();
        jumpPos.height = 140;
        jumpPos.width = 140;
        positions.push(jumpPos)
        char.removeChild(char.children[1]);
        char.removeChild(char.children[1]);
        char.removeChild(char.lastChild);
        char.append(highJump);
        char.append(createDebuff('images/Fire_Resistance_Down.png', 'fire resistance down'));

        const divePos = highJump.getBoundingClientRect();
        setDivePositions(i, divePos);

        timeouts.push(setTimeout(() => {
          highJump.remove();
          makeTowerAtPos(jumpPos.left, jumpPos.top);
        }, 3000));
      }
      if ((char.lastElementChild as HTMLImageElement).alt === 'spineshatter dive target') {
        const spineshatterDive = spineshatterDiveContainer();
        spineshatterDive.append(diveFromGrace());
        char.append(spineshatterDive);

        const jumpPos = spineshatterDive.getBoundingClientRect();
        jumpPos.height = 140;
        jumpPos.width = 140;
        positions.push(jumpPos)
        char.removeChild(char.children[1]);
        char.removeChild(char.children[1]);
        char.removeChild(char.lastChild);
        char.append(highJump);
        char.append(createDebuff('images/Fire_Resistance_Down.png', 'fire resistance down'));

        const divePos = highJump.getBoundingClientRect();
        setDivePositions(i, divePos);

        timeouts.push(setTimeout(() => {
          highJump.remove();
          makeTowerAtPos(jumpPos.left, jumpPos.top);
        }, 3000));
      }
    });

    for (let i = 0; i < inLineGroups.first.length; i++) {
      switch (i) {
        case 0:
          const diveCharOne = inLineGroups.first[i].querySelector('.icon-sizing').getBoundingClientRect();
          if (isInside(diveTwo, diveCharOne)) {
            failStep();
            toggleDiveOneFail();
            timeouts.forEach(timeout => clearTimeout(timeout));
            return;
          }
          if (isInside(diveThree, diveCharOne)) {
            failStep();
            toggleDiveOneFail();
            timeouts.forEach(timeout => clearTimeout(timeout));
            return;
          }
          break;
        case 1:
          const diveCharTwo = inLineGroups.first[i].querySelector('.icon-sizing').getBoundingClientRect();
          if (isInside(diveOne, diveCharTwo)) {

            toggleDiveOneFail();
            timeouts.forEach(timeout => clearTimeout(timeout));
            return;
          }
          if (isInside(diveThree, diveCharTwo)) {
            failStep();
            toggleDiveOneFail();
            timeouts.forEach(timeout => clearTimeout(timeout));
            return;
          }
          break;
        case 2:
          const diveCharThree = inLineGroups.first[i].querySelector('.icon-sizing').getBoundingClientRect();
          if (isInside(diveOne, diveCharThree)) {
            failStep();
            toggleDiveOneFail();
            timeouts.forEach(timeout => clearTimeout(timeout));
            return;
          }
          if (isInside(diveTwo, diveCharThree)) {
            failStep();
            toggleDiveOneFail();
            timeouts.forEach(timeout => clearTimeout(timeout));
            return;
          }
          break;
        default:
          break;
      }
    }

    for (let i = 0; i < soakers.length; i++) {
      const soaker = soakers[i];
      if (isInside(diveOne, soaker)) {
        failStep();
        toggleDiveOneFail();
        timeouts.forEach(timeout => clearTimeout(timeout));
        return;
      }
      if (isInside(diveTwo, soaker)) {
        failStep();
        toggleDiveOneFail();
        timeouts.forEach(timeout => clearTimeout(timeout));
        return;
      }
      if (isInside(diveThree, soaker)) {
        failStep();
        toggleDiveOneFail();
        timeouts.forEach(timeout => clearTimeout(timeout));
        return;
      }
      if (!(isInside(aoePos, soaker))) {
        failStep();
        toggleSoakFail();
        return;
      }
    };

    setTimeout(() => {
      aoeContainer.remove();
    }, 3000);

    towerPositions.first = positions;
  }

  /**
   * 0:32 Lash/Gnash Part 1 (In/Out)
   */
  const stepSix = () => inOutOne();

  /**
   * 0:34 First in line: Tower Soaks
   */
  const stepSeven = () => {
    let firstTowerSoaked = false;
    let secondTowerSoaked = false;
    let thirdTowerSoaked = false;

    document.querySelectorAll('.tower-soaks').forEach((elem: HTMLImageElement) => elem.src = 'images/CircleAoE.gif');

    const soakedFirstTower = (char: DOMRect) => isInside(towerPositions.first[0], char);
    const soakedSecondTower = (char: DOMRect) => isInside(towerPositions.first[1], char);
    const soakedThirdTower = (char: DOMRect) => isInside(towerPositions.first[2], char);

    inLineGroups.third.forEach(char => {
      const charPos = char.querySelector('.icon-sizing').getBoundingClientRect();
      if (soakedFirstTower(charPos)) {
        firstTowerSoaked = true;
        char.append(createDebuff('images/Fire_Resistance_Down.png', 'fire resistance down'));
      }
      else if (soakedSecondTower(charPos)) {
        secondTowerSoaked = true;
        char.append(createDebuff('images/Fire_Resistance_Down.png', 'fire resistance down'));
      }
      else if (soakedThirdTower(charPos)) {
        thirdTowerSoaked = true;
        char.append(createDebuff('images/Fire_Resistance_Down.png', 'fire resistance down'));
      }
    })

    if (firstTowerSoaked === false || secondTowerSoaked === false || thirdTowerSoaked === false) {
      failStep();
      toggleFirstTowerSoakFail();
      return;
    } else {
      setTimeout( () => { document.querySelectorAll('.tower-soaks').forEach(elem => elem.remove())}, 3000 );
    }
  };

  /**
   * 0:35 Lash/Gnash Part 2 (In/Out)
   */
  const stepEight = () => {
    inOutTwo();
    inLineGroups.first.forEach(char => char.removeChild(char.children[1]));
  };

  /**
   * 0:36 First in line: Clone Baits
   */
  const stepNine = () => {
    // Need to do. Towers first tho.
    toggleNotFinished();
  };

  /**
   * 0:38 Second in line: High Jump
   */
  const stepTen = () => {
    let timeouts = [];
    let positions = [];
    let diveOne;
    let diveTwo;

    const setDivePositions = (i: number, divePos: DOMRect) => {
      switch (i) {
        case 0:
          diveOne = divePos;
          break;
        case 1:
          diveTwo = divePos;
          break;
      }
    };

    inLineGroups.second.forEach((char, i) => {
      const highJump = highJumpContainer();
      highJump.append(diveFromGrace());
      if ((char.lastElementChild as HTMLImageElement).alt === 'high jump target') {
        char.append(highJump);

        const jumpPos = highJump.getBoundingClientRect();
        jumpPos.height = 140;
        jumpPos.width = 140;
        positions.push(jumpPos)
        char.removeChild(char.children[1]);
        char.removeChild(char.children[1]);
        char.append(createDebuff('images/Fire_Resistance_Down.png', 'fire resistance down'));

        const divePos = highJump.getBoundingClientRect();
        setDivePositions(i, divePos);

        timeouts.push(setTimeout(() => {
          highJump.remove();
          makeTowerAtPos(jumpPos.left, jumpPos.top);
        }, 3000));
      }
      if ((char.lastElementChild as HTMLImageElement).alt === 'elusive jump target') {
        const elusiveJump = elusiveJumpContainer();
        elusiveJump.append(diveFromGrace());
        char.append(elusiveJump);

        const jumpPos = elusiveJump.getBoundingClientRect();
        jumpPos.height = 140;
        jumpPos.width = 140;
        positions.push(jumpPos)
        char.removeChild(char.children[1]);
        char.removeChild(char.children[1]);
        char.removeChild(char.lastChild);
        char.append(highJump);
        char.append(createDebuff('images/Fire_Resistance_Down.png', 'fire resistance down'));

        const divePos = highJump.getBoundingClientRect();
        setDivePositions(i, divePos);

        timeouts.push(setTimeout(() => {
          highJump.remove();
          makeTowerAtPos(jumpPos.left, jumpPos.top);
        }, 3000));
      }
      if ((char.lastElementChild as HTMLImageElement).alt === 'spineshatter dive target') {
        const spineshatterDive = spineshatterDiveContainer();
        spineshatterDive.append(diveFromGrace());
        char.append(spineshatterDive);

        const jumpPos = spineshatterDive.getBoundingClientRect();
        jumpPos.height = 140;
        jumpPos.width = 140;
        positions.push(jumpPos)
        char.removeChild(char.children[1]);
        char.removeChild(char.children[1]);
        char.removeChild(char.lastChild);
        char.append(highJump);
        char.append(createDebuff('images/Fire_Resistance_Down.png', 'fire resistance down'));

        const divePos = highJump.getBoundingClientRect();
        setDivePositions(i, divePos);

        timeouts.push(setTimeout(() => {
          highJump.remove();
          makeTowerAtPos(jumpPos.left, jumpPos.top);
        }, 3000));
      }
    });

    const party = [ ...inLineGroups.first, ...inLineGroups.third];

    party.forEach(char => {
      const charPos = char.querySelector('.icon-sizing').getBoundingClientRect();
      if (isInside(diveOne, charPos)) {
        failStep();
        toggleDiveTwoFail();
        timeouts.forEach(timeout => clearTimeout(timeout));
        return;
      }
      if (isInside(diveTwo, charPos)) {
        failStep();
        toggleDiveTwoFail();
        timeouts.forEach(timeout => clearTimeout(timeout));
        return;
      }
    })

    towerPositions.second = positions;
  };

  /**
   * 0:40 First in line: Clone Geirskoguls
   */
  const stepEleven = () => {
    // Need to do. Towers first tho.
    toggleNotFinished();
  };

  /**
   * 0:44 Second in line: Tower Soaks
   */
  const stepTwelve = () => {
    let firstTowerSoaked = false;
    let secondTowerSoaked = false;

    document.querySelectorAll('.tower-soaks').forEach((elem: HTMLImageElement) => elem.src = 'images/CircleAoE.gif');

    const soakedFirstTower = (char: DOMRect) => isInside(towerPositions.second[0], char);
    const soakedSecondTower = (char: DOMRect) => isInside(towerPositions.second[1], char);

    inLineGroups.first.forEach(char => {
      const charPos = char.querySelector('.icon-sizing').getBoundingClientRect();
      if (soakedFirstTower(charPos)) {
        if (firstTowerSoaked) {
          failStep();
          toggleSecondTowerSoakFail();
          return;
        }
        firstTowerSoaked = true;
        char.append(createDebuff('images/Fire_Resistance_Down.png', 'fire resistance down'));
      }
      else if (soakedSecondTower(charPos)) {
        if (secondTowerSoaked) {
          failStep();
          toggleSecondTowerSoakFail();
          return;
        }
        secondTowerSoaked = true;
        char.append(createDebuff('images/Fire_Resistance_Down.png', 'fire resistance down'));
      }
    })

    if (firstTowerSoaked === false || secondTowerSoaked === false) {
      failStep();
      toggleSecondTowerSoakFail();
      return;
    } else {
      setTimeout( () => { document.querySelectorAll('.tower-soaks').forEach(elem => elem.remove())}, 3000 );
    }
  };

  /**
   * 0:46 Second in line: Clone Baits
   */
  const stepThirteen = () => {
    inLineGroups.third.forEach(char => char.removeChild(char.children[3]));
    // Need to do. Towers first tho.
    toggleNotFinished();
  };

  /**
   * 0:48 Third in line: High Jump & Eye of the Tyrant (Shared AoE)
   */
  const stepFourteen = () => {
    stepFour();
    const sharedAoeTargets = [...inLineGroups.first, ...inLineGroups.second];
    const target = Math.floor(Math.random() * 4);

    const aoeContainer = document.createElement('div');
    aoeContainer.className = 'position-absolute top-50 left-50';
    aoeContainer.setAttribute('style', 'transform: translate(-37%, -57%); z-index: -1;');

    const sharedAoe = document.createElement('img');
    sharedAoe.src = 'images/Stack-Marker.gif';
    sharedAoe.setAttribute('alt', 'Eye of the Tyrant');
    sharedAoe.className = 'eye-of-the-tyrant';
    aoeContainer.append(sharedAoe);

    const aoeTarget = sharedAoeTargets[target]
    aoeTarget.append(aoeContainer);

    const aoePos = sharedAoe.getBoundingClientRect();
    aoePos.width = 256;
    aoePos.height = 256;
    const soakers = [
      inLineGroups.second[0].querySelector('.icon-sizing').getBoundingClientRect(),
      inLineGroups.second[1].querySelector('.icon-sizing').getBoundingClientRect(),
      inLineGroups.first[0].querySelector('.icon-sizing').getBoundingClientRect(),
      inLineGroups.first[1].querySelector('.icon-sizing').getBoundingClientRect(),
      inLineGroups.first[2].querySelector('.icon-sizing').getBoundingClientRect(),
    ];

    let positions = [];
    let timeouts = [];
    let diveOne: DOMRect;
    let diveTwo: DOMRect;
    let diveThree: DOMRect;

    const setDivePositions = (i: number, divePos: DOMRect) => {
      switch (i) {
        case 0:
          diveOne = divePos;
          break;
        case 1:
          diveTwo = divePos;
          break;
        case 2:
          diveThree = divePos;
          break;
      }
    };

    inLineGroups.third.forEach((char, i) => {
      const highJump = highJumpContainer();
      highJump.append(diveFromGrace());
      if ((char.lastElementChild as HTMLImageElement).alt === 'high jump target') {
        char.append(highJump);

        const jumpPos = highJump.getBoundingClientRect();
        jumpPos.height = 140;
        jumpPos.width = 140;
        positions.push(jumpPos)
        char.removeChild(char.children[1]);
        char.removeChild(char.children[1]);
        char.append(createDebuff('images/Fire_Resistance_Down.png', 'fire resistance down'));

        const divePos = highJump.getBoundingClientRect();
        setDivePositions(i, divePos);

        timeouts.push(setTimeout(() => {
          highJump.remove();
          makeTowerAtPos(jumpPos.left, jumpPos.top);
        }, 3000));
      }
      if ((char.lastElementChild as HTMLImageElement).alt === 'elusive jump target') {
        const elusiveJump = elusiveJumpContainer();
        elusiveJump.append(diveFromGrace());
        char.append(elusiveJump);

        const jumpPos = elusiveJump.getBoundingClientRect();
        jumpPos.height = 140;
        jumpPos.width = 140;
        positions.push(jumpPos)
        char.removeChild(char.children[1]);
        char.removeChild(char.children[1]);
        char.removeChild(char.lastChild);
        char.append(highJump);
        char.append(createDebuff('images/Fire_Resistance_Down.png', 'fire resistance down'));

        const divePos = highJump.getBoundingClientRect();
        setDivePositions(i, divePos);

        timeouts.push(setTimeout(() => {
          highJump.remove();
          makeTowerAtPos(jumpPos.left, jumpPos.top);
        }, 3000));
      }
      if ((char.lastElementChild as HTMLImageElement).alt === 'spineshatter dive target') {
        const spineshatterDive = spineshatterDiveContainer();
        spineshatterDive.append(diveFromGrace());
        char.append(spineshatterDive);

        const jumpPos = spineshatterDive.getBoundingClientRect();
        jumpPos.height = 140;
        jumpPos.width = 140;
        positions.push(jumpPos)
        char.removeChild(char.children[1]);
        char.removeChild(char.children[1]);
        char.removeChild(char.lastChild);
        char.append(highJump);
        char.append(createDebuff('images/Fire_Resistance_Down.png', 'fire resistance down'));

        const divePos = highJump.getBoundingClientRect();
        setDivePositions(i, divePos);

        timeouts.push(setTimeout(() => {
          highJump.remove();
          makeTowerAtPos(jumpPos.left, jumpPos.top);
        }, 3000));
      }
    });

    for (let i = 0; i < inLineGroups.third.length; i++) {
      switch (i) {
        case 0:
          const diveCharOne = inLineGroups.third[i].querySelector('.icon-sizing').getBoundingClientRect();
          if (isInside(diveTwo, diveCharOne)) {
            failStep();
            toggleDiveThreeFail();
            timeouts.forEach(timeout => clearTimeout(timeout));
            return;
          }
          if (isInside(diveThree, diveCharOne)) {
            failStep();
            toggleDiveThreeFail();
            timeouts.forEach(timeout => clearTimeout(timeout));
            return;
          }
          break;
        case 1:
          const diveCharTwo = inLineGroups.third[i].querySelector('.icon-sizing').getBoundingClientRect();
          if (isInside(diveOne, diveCharTwo)) {

            toggleDiveThreeFail();
            timeouts.forEach(timeout => clearTimeout(timeout));
            return;
          }
          if (isInside(diveThree, diveCharTwo)) {
            failStep();
            toggleDiveThreeFail();
            timeouts.forEach(timeout => clearTimeout(timeout));
            return;
          }
          break;
        case 2:
          const diveCharThree = inLineGroups.third[i].querySelector('.icon-sizing').getBoundingClientRect();
          if (isInside(diveOne, diveCharThree)) {
            failStep();
            toggleDiveThreeFail();
            timeouts.forEach(timeout => clearTimeout(timeout));
            return;
          }
          if (isInside(diveTwo, diveCharThree)) {
            failStep();
            toggleDiveThreeFail();
            timeouts.forEach(timeout => clearTimeout(timeout));
            return;
          }
          break;
        default:
          break;
      }
    }

    for (let i = 0; i < soakers.length; i++) {
      const soaker = soakers[i];
      if (isInside(diveOne, soaker)) {
        failStep();
        toggleDiveThreeFail();
        timeouts.forEach(timeout => clearTimeout(timeout));
        return;
      }
      if (isInside(diveTwo, soaker)) {
        failStep();
        toggleDiveThreeFail();
        timeouts.forEach(timeout => clearTimeout(timeout));
        return;
      }
      if (isInside(diveThree, soaker)) {
        failStep();
        toggleDiveThreeFail();
        timeouts.forEach(timeout => clearTimeout(timeout));
        return;
      }
      if (!(isInside(aoePos, soaker))) {
        failStep();
        toggleSoakTwoFail();
        return;
      }
    };

    setTimeout(() => {
      aoeContainer.remove();
    }, 3000);

    towerPositions.first = positions;
  };

  /**
   * 0:50 Second in line: Clone Geirskoguls
   */
  const stepFifteen = () => {
    // Need to do. Towers first tho.
    toggleNotFinished();
  }

  /**
   * 0:52 Lash/Gnash Part 1
   */
  const stepSixteen = () => {
    inLineGroups.second.forEach(char => char.removeChild(char.children[1]));
    inOutOne();
  }

  /**
   * 0:56 Third in line: Tower Soaks
  */
  const stepSeventeen = () => {
    let firstTowerSoaked = false;
    let secondTowerSoaked = false;
    let thirdTowerSoaked = false;

    document.querySelectorAll('.tower-soaks').forEach((elem: HTMLImageElement) => elem.src = 'images/CircleAoE.gif');

    const soakedFirstTower = (char: DOMRect) => isInside(towerPositions.first[0], char);
    const soakedSecondTower = (char: DOMRect) => isInside(towerPositions.first[1], char);
    const soakedThirdTower = (char: DOMRect) => isInside(towerPositions.first[2], char);

    inLineGroups.second.forEach(char => {
      const charPos = char.querySelector('.icon-sizing').getBoundingClientRect();
      if (soakedFirstTower(charPos)) {
        firstTowerSoaked = true;
        char.append(createDebuff('images/Fire_Resistance_Down.png', 'fire resistance down'));
      }
      else if (soakedSecondTower(charPos)) {
        secondTowerSoaked = true;
        char.append(createDebuff('images/Fire_Resistance_Down.png', 'fire resistance down'));
      }
      else if (soakedThirdTower(charPos)) {
        thirdTowerSoaked = true;
        char.append(createDebuff('images/Fire_Resistance_Down.png', 'fire resistance down'));
      }
    });

    inLineGroups.first.forEach(char => {
      if ((char.lastElementChild as HTMLImageElement).alt !== 'fire resistance down') {
        const charPos = char.querySelector('.icon-sizing').getBoundingClientRect();
        if (soakedFirstTower(charPos)) {
          firstTowerSoaked = true;
          char.append(createDebuff('images/Fire_Resistance_Down.png', 'fire resistance down'));
        }
        else if (soakedSecondTower(charPos)) {
          secondTowerSoaked = true;
          char.append(createDebuff('images/Fire_Resistance_Down.png', 'fire resistance down'));
        }
        else if (soakedThirdTower(charPos)) {
          thirdTowerSoaked = true;
          char.append(createDebuff('images/Fire_Resistance_Down.png', 'fire resistance down'));
        }
      }
    });

    if (firstTowerSoaked === false || secondTowerSoaked === false || thirdTowerSoaked === false) {
      failStep();
      toggleThirdTowerSoakFail();
      return;
    } else {
      setTimeout( () => { document.querySelectorAll('.tower-soaks').forEach(elem => elem.remove())}, 3000 );
    }
  }

  /**
   * 0:57 Lash/Gnash Part 2
   */
  const stepEighteen = () => inOutTwo();

  /**
   * 0:58 Third in line: Clone Baits
   */
  const stepNineteen = () => {
    // Need to do. Towers first tho.
    toggleNotFinished();
    document.getElementById('nextStepButton').setAttribute('disabled', 'true');
  }

  const initEvents = () => {
    document.getElementById('nextStepButton').addEventListener('click', () => {
      const currentStep = document.getElementById('currentStep');
      const nextStep = currentStep.nextElementSibling;
      if (currentStep.className != 'table-danger') currentStep.className = "table-success";
      currentStep.removeAttribute('id');
      nextStep.className = 'table-secondary';
      nextStep.id = 'currentStep';
      step += 1;
      switch (step) {
        case 2:
          stepTwo();
          break;
        case 3:
          stepThree();
          break;
        case 4:
          stepFour();
          break;
        case 5:
          stepFive();
          break;
        case 6:
          stepSix();
          break;
        case 7:
          stepSeven();
          break;
        case 8:
          stepEight();
          break;
        case 9:
          stepNine();
          break;
        case 10:
          stepTen();
          break;
        case 11:
          stepEleven();
          break;
        case 12:
          stepTwelve();
          break;
        case 13:
          stepThirteen();
          break;
        case 14:
          stepFourteen();
          break;
        case 15:
          stepFifteen();
          break;
        case 16:
          stepSixteen();
          break;
        case 17:
          stepSeventeen();
          break;
        case 18:
          stepEighteen();
          break;
        case 19:
          stepNineteen();
          break;
        default:
          break;
      }
    })
  };

  onMount(() => {
    initEvents();
  });
</script>

<div class="d-flex justify-content-center align-items-center h-100">
  <div id="bossContainer" class="text-center position-relative">
    <img src={boss} alt="boss icon" class='boss-sizing face-north' />
  </div>
</div>

<Modal body header="Eye of the Tyrant soak failed!" isOpen={soakFailOpen} toggle={toggleSoakFail} class="modal-lg modal-dialog-centered">
  <p>One or more players were not in the <code>Eye of the Tyrant</code> soak! When Nidhogg starts casting <code>Lash and Gnash/Gnash and Lash</code> all players that are not marked with the first <code>Dive from Grace</code> <img src="images/First_in_Line.png" class="debuff-sizing" alt="first in line" /> should stack in preparation for this shared AOE.</p>
</Modal>

<Modal body header="Dive from Grace failed!" isOpen={diveOneFailOpen} toggle={toggleDiveOneFail} class="modal-lg modal-dialog-centered">
  <p>A player other than the target of one of the first <code>Dive from Grace</code> <img src="images/First_in_Line.png" class="debuff-sizing" alt="first in line" /> debuffs was hit by the dive aoe! This knocks back players, which could cause a death, but also applies <code>Fire Resistance Down</code> <img src="images/Fire_Resistance_Down.png" class="debuff-sizing" alt="fire resistance down" /> that makes a player unable to soak a tower. If two dive targets hit each other they will also just die.</p>
</Modal>

<Modal body header="Lash failed!" isOpen={lashFailOpen} toggle={toggleLashFail} class="modal-lg modal-dialog-centered">
  <p>One or more players were not inside of the boss hitbox when the <code>Lash</code> portion of <code>Lash and Gnash/Gnash and Lash</code> went off. While this is not lethal, it knocks back the player and give a damage down debuff.</p>
</Modal>

<Modal body header="Gnash failed!" isOpen={gnashFailOpen} toggle={toggleGnashFail} class="modal-lg modal-dialog-centered">
  <p>One or more players were not outside of the boss hitbox when the <code>Gnash</code> portion of <code>Lash and Gnash/Gnash and Lash</code> went off. While this is not lethal, it knocks back the player and give a damage down debuff.</p>
</Modal>

<Modal body header="First tower soaks failed!" isOpen={firstTowerSoakFailOpen} toggle={toggleFirstTowerSoakFail} class="modal-lg modal-dialog-centered">
  <p>One of the first towers were not soaked! This set is to be soaked by players with the third <code>Dive from Grace</code> <img src="images/Third_in_Line.png" class="debuff-sizing" alt="third in line" /> debuff because the first in line players have a fire resistance down debuff, and the second in line players are getting ready to place their dives.</p>
</Modal>

<Modal body header="Dive from Grace failed!" isOpen={diveTwoFailOpen} toggle={toggleDiveTwoFail} class="modal-lg modal-dialog-centered">
  <p>A player other than the target of one of the second <code>Dive from Grace</code> <img src="images/Second_in_Line.png" class="debuff-sizing" alt="second in line" /> debuffs was hit by the dive aoe! This knocks back players, which could cause a death, but also applies <code>Fire Resistance Down</code> <img src="images/Fire_Resistance_Down.png" class="debuff-sizing" alt="fire resistance down" /> that makes a player unable to soak a tower. If two dive targets hit each other they will also just die.</p>
</Modal>

<Modal body header="Second tower soaks failed!" isOpen={secondTowerSoakFailOpen} toggle={toggleSecondTowerSoakFail} class="modal-lg modal-dialog-centered">
  <p>One of the second towers were not soaked! This set is to be soaked by players with the first <code>Dive from Grace</code> <img src="images/First_in_Line.png" class="debuff-sizing" alt="third in line" /> debuff because the second and third in line players have a fire resistance down debuff, and the third in line players are getting ready to place their dives.</p>
</Modal>

<Modal body header="Not Finished" isOpen={notFinishedOpen} toggle={toggleNotFinished} class="modal-lg modal-dialog-centered">
  <p>I haven't finished this step. Sorry, go on to the next one.</p>
</Modal>

<Modal body header="Eye of the Tyrant soak failed!" isOpen={soakFailTwoOpen} toggle={toggleSoakTwoFail} class="modal-lg modal-dialog-centered">
  <p>One or more players were not in the <code>Eye of the Tyrant</code> soak! When Nidhogg starts casting <code>Lash and Gnash/Gnash and Lash</code> all players that are not marked with the third <code>Dive from Grace</code> <img src="images/Third_in_Line.png" class="debuff-sizing" alt="third in line" /> should stack in preparation for this shared AOE.</p>
</Modal>

<Modal body header="Dive from Grace failed!" isOpen={diveThreeFailOpen} toggle={toggleDiveThreeFail} class="modal-lg modal-dialog-centered">
  <p>A player other than the target of one of the third <code>Dive from Grace</code> <img src="images/Third_in_Line.png" class="debuff-sizing" alt="third in line" /> debuffs was hit by the dive aoe! This knocks back players, which could cause a death, but also applies <code>Fire Resistance Down</code> <img src="images/Fire_Resistance_Down.png" class="debuff-sizing" alt="fire resistance down" /> that makes a player unable to soak a tower. If two dive targets hit each other they will also just die.</p>
</Modal>

<Modal body header="Third tower soaks failed!" isOpen={thirdTowerSoakFailOpen} toggle={toggleThirdTowerSoakFail} class="modal-lg modal-dialog-centered">
  <p>One of the second towers were not soaked! This set is to be soaked by players with the first <code>Dive from Grace</code> <img src="images/First_in_Line.png" class="debuff-sizing" alt="third in line" /> debuff the do not have <code>Fire Resistance Down</code> <img src="images/Fire_Resistance_Down.png" class="debuff-sizing" alt="fire resistance down" /> and both of the second  <code>Dive from Grace</code> <img src="images/Second_in_Line.png" class="debuff-sizing" alt="second in line" /> targets.</p>
</Modal>
