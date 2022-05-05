<script lang="ts">
  import { onMount } from "svelte/internal";
  import { Modal } from 'sveltestrap';
  import {
    getMultipleRandom,
    range,
    createDebuff,
    highJumpContainer,
    elusiveJumpContainer,
    spineshatterDiveContainer,
    diveFromGrace
  } from './scripts/utils';

  import type { InLineGroups, TowerPositions } from '../types';


  let step = 1;
  let inLineGroups = { first: [], second: [], third: [] };
  let towerPositions = { first: [], second: [], third: [] };
  let soakFailOpen = false;
  const toggleSoakFail = () => (soakFailOpen = !soakFailOpen);
  const boss = 'images/DefaultNpc.png';

  const failStep = () => {
    const currentStep = document.getElementById('currentStep');
    currentStep.className = "table-danger";
    document.getElementById('nextStepButton').setAttribute('disabled', 'true');
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

    let positions = []

    groups.first.forEach((char: HTMLElement) => {
      const highJump = highJumpContainer();
      highJump.append(diveFromGrace());
      if ((char.lastElementChild as HTMLImageElement).alt === 'high jump target') {
        char.append(highJump);

        const jumpPos = highJump.getBoundingClientRect();
        positions.push({ x: jumpPos.x, y: jumpPos.y })
        char.removeChild(char.children[1]);
        char.removeChild(char.children[1]);
        char.append(createDebuff('images/Fire_Resistance_Down.png', 'fire resistance down'));
        setTimeout(() => {
          highJump.remove();
        }, 3000)
      }
      if ((char.lastElementChild as HTMLImageElement).alt === 'elusive jump target') {
        const elusiveJump = elusiveJumpContainer();
        elusiveJump.append(diveFromGrace());
        char.append(elusiveJump);

        const jumpPos = elusiveJump.getBoundingClientRect();
        positions.push({ x: jumpPos.x, y: jumpPos.y })
        char.removeChild(char.children[1]);
        char.removeChild(char.children[1]);
        char.removeChild(char.lastChild);
        char.append(highJump);
        char.append(createDebuff('images/Fire_Resistance_Down.png', 'fire resistance down'));
        setTimeout(() => {
          highJump.remove();
        }, 3000)
      }
      if ((char.lastElementChild as HTMLImageElement).alt === 'spineshatter dive target') {
        const spineshatterDive = spineshatterDiveContainer();
        spineshatterDive.append(diveFromGrace());
        char.append(spineshatterDive);

        const jumpPos = spineshatterDive.getBoundingClientRect();
        positions.push({ x: jumpPos.x, y: jumpPos.y })
        char.removeChild(char.children[1]);
        char.removeChild(char.children[1]);
        char.removeChild(char.lastChild);
        char.append(highJump);
        char.append(createDebuff('images/Fire_Resistance_Down.png', 'fire resistance down'));
        setTimeout(() => {
          highJump.remove();
        }, 3000)
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

    setTimeout(() => {
          aoeContainer.remove();
        }, 3000)

    return {
      first: positions,
      second: [],
      third: []
    };
  }

  const stepSix = () => {
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
          stepSix();
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
