<script lang="ts">
  import { onMount } from "svelte/internal";
  import { Modal } from 'sveltestrap';


  interface InLineGroups {
    first:  HTMLElement [];
    second: HTMLElement [];
    third:  HTMLElement [];
  }
  interface Coordinate {
    x: number;
    y: number;
  }
  interface TowerPositions {
    first: Coordinate [];
    second: Coordinate [];
    third: Coordinate [];
  }

  let step = 1;
  let inLineGroups = { first: [], second: [], third: [] };
  let towerPositions = { first: [], second: [], third: [] };
  let soakFailOpen = false;
  const toggleSoakFail = () => (soakFailOpen = !soakFailOpen);
  const boss = 'images/DefaultNpc.png';

  const getMultipleRandom = (arr: Array<HTMLElement>, num: number) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }

  const range = (start: number, end: number) => {
    let myArray = [];
    for (var i = start; i <= end; i += 1) {
      myArray.push(i);
    }
    return myArray;
  };

  const failStep = () => {
    const currentStep = document.getElementById('currentStep');
    currentStep.className = "table-danger";
    document.getElementById('nextStepButton').setAttribute('disabled', 'true');
  }

  const createDebuff = (img: string, alt: string) => {
    const elem = document.createElement("img");
    elem.src = img;
    elem.setAttribute('class', 'debuff-sizing');
    elem.setAttribute('alt', alt);
    return elem;
  }

  const stepTwo = (): InLineGroups => {
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

    return {
      first: firstMarkers,
      second: secondMarkers,
      third: party
    }
  };

  const stepThree = (groups: InLineGroups) => {
    if ((Math.floor(Math.random() * 2)) === 0) {
      groups.first[0].append(createDebuff('images/High_Jump_Target.png', 'high jump target'));
      groups.first[1].append(createDebuff('images/Elusive_Jump_Target.png', 'elusive jump target'));
      groups.first[2].append(createDebuff('images/Spineshatter_Dive_Target.png', 'spineshatter dive target'));
    } else {
      groups.first.forEach(char => {
        char.append(createDebuff('images/High_Jump_Target.png', 'high jump target'));
      });
    }

    if ((Math.floor(Math.random() * 2)) === 0) {
      groups.second[0].append(createDebuff('images/Elusive_Jump_Target.png', 'elusive jump target'));
      groups.second[1].append(createDebuff('images/Spineshatter_Dive_Target.png', 'spineshatter dive target'));
    } else {
      groups.second.forEach(char => {
        char.append(createDebuff('images/High_Jump_Target.png', 'high jump target'));
      });
    }

    if ((Math.floor(Math.random() * 2)) === 0) {
      groups.third[0].append(createDebuff('images/High_Jump_Target.png', 'high jump target'));
      groups.third[1].append(createDebuff('images/Elusive_Jump_Target.png', 'elusive jump target'));
      groups.third[2].append(createDebuff('images/Spineshatter_Dive_Target.png', 'spinehsatter dive target'));
    } else {
      groups.third.forEach(char => {
        char.append(createDebuff('images/High_Jump_Target.png', 'high jump target'));
      });
    }
  };

  const stepFour = () => {
    const castName = Math.floor(Math.random() * 2) === 0 ? 'Lash and Gnash' : 'Gnash and Lash';

    const elem = document.createElement('div')
    elem.className = 'boss-castbar'

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

  const stepFive = (groups: InLineGroups) => {
    document.getElementById('nextStepButton').setAttribute('disabled', 'true');
    const sharedAoeTargets = [...groups.second, ...groups.third];
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

    const aoePos = aoeContainer.getBoundingClientRect();
    const aoeX = Math.round(aoePos.x);
    const aoeY = Math.round(aoePos.y);
    const safeX = range(aoeX - 100, aoeX + 100)
    const safeY = range(aoeY - 100, aoeY + 100)
    const soakers = [
      groups.second[0].getBoundingClientRect(),
      groups.second[1].getBoundingClientRect(),
      groups.third[0].getBoundingClientRect(),
      groups.third[1].getBoundingClientRect(),
      groups.third[2].getBoundingClientRect(),
    ];

    const highJumpContainer = () => {
      const elem = document.createElement('div');
      elem.className = 'position-absolute top-50 left-50';
      elem.setAttribute('style', 'transform: translate(-30%, -60%); z-index: -1;');
      return elem;
    };

    const elusiveJumpContainer = () => {
      const elem = document.createElement('div');
      elem.className = 'position-absolute top-50 left-50';
      elem.setAttribute('style', 'transform: translate(-30%, 80%); z-index: -1;');
      return elem;
    };

    const spineshatterDiveContainer = () => {
      const elem = document.createElement('div');
      elem.className = 'position-absolute top-50 left-50';
      elem.setAttribute('style', 'transform: translate(-30%, -180%); z-index: -1;');
      return elem;
    }

    const diveFromGrace = () => {
      const elem = document.createElement('img');
      elem.src = 'images/Target-Circle.gif';
      elem.alt = 'dive from grace';
      elem.className = 'dive-circle';
      return elem;
    };

    let positions = []

    groups.first.forEach((char: HTMLElement) => {
      const highJump = highJumpContainer();
      highJump.append(diveFromGrace());
      if ((char.lastElementChild as HTMLImageElement).alt === 'high jump target') {
        char.append(highJump);

        const jumpPos = highJump.getBoundingClientRect();
        positions.push({ x: jumpPos.x, y: jumpPos.y })
      }
      if ((char.lastElementChild as HTMLImageElement).alt === 'elusive jump target') {
        const elusiveJump = elusiveJumpContainer();
        elusiveJump.append(diveFromGrace());
        char.append(elusiveJump);

        const jumpPos = elusiveJump.getBoundingClientRect();
        positions.push({ x: jumpPos.x, y: jumpPos.y })
        char.removeChild(char.lastChild);
        char.append(highJump);
      }
      if ((char.lastElementChild as HTMLImageElement).alt === 'spineshatter dive target') {
        const spineshatterDive = spineshatterDiveContainer();
        spineshatterDive.append(diveFromGrace());
        char.append(spineshatterDive);

        const jumpPos = spineshatterDive.getBoundingClientRect();
        positions.push({ x: jumpPos.x, y: jumpPos.y })
        char.removeChild(char.lastChild);
        char.append(highJump);
      }
    });

    if (!safeX.includes(Math.round(soakers[0].x)) || !(safeY.includes(Math.round(soakers[0].y)))) {
      failStep();
      toggleSoakFail();
      return;
    }
    if (!safeX.includes(Math.round(soakers[1].x)) || !(safeY.includes(Math.round(soakers[1].y)))) {
      failStep();
      toggleSoakFail();
      return;
    }
    if (!safeX.includes(Math.round(soakers[2].x)) || !(safeY.includes(Math.round(soakers[2].y)))) {
      failStep();
      toggleSoakFail();
      return;
    }
    if (!safeX.includes(Math.round(soakers[3].x)) || !(safeY.includes(Math.round(soakers[3].y)))) {
      failStep();
      toggleSoakFail();
      return;
    }
    if (!safeX.includes(Math.round(soakers[4].x)) || !(safeY.includes(Math.round(soakers[4].y)))) {
      failStep();
      toggleSoakFail();
      return;
    }
    return {
      first: positions,
      second: [],
      third: []
    };
  }

  const stepSix = (towers: TowerPositions) => {
    //
  };

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
          inLineGroups = stepTwo();
          break;
        case 3:
          stepThree(inLineGroups);
          break;
        case 4:
          stepFour();
          break;
        case 5:
          towerPositions = stepFive(inLineGroups);
          break;
        case 6:
          stepSix(towerPositions);
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
