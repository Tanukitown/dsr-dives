<script lang="ts">
  import { onMount } from "svelte/internal";


  let step = 1;
  let inLineGroups = { first: [], second: [], third: [] };
  const estinien = 'images/estinien.png';
  interface InLineGroups {
    first:  HTMLElement [];
    second: HTMLElement [];
    third:  HTMLElement [];
  }

  const getMultipleRandom = (arr: Array<HTMLElement>, num: number) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
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
      char.append(createDebuff('images/First_In_Line.png', 'first in line debuff'));
    });
    secondMarkers.forEach(char => {
      char.append(createDebuff('images/Second_In_Line.png', 'second in line debuff'));
    });
    party.forEach(char => {
      char.append(createDebuff('images/Third_In_Line.png', 'third in line debuff'));
    });

    return {
      first: firstMarkers,
      second: secondMarkers,
      third: party
    }
  };

  const stepThree = (groups: InLineGroups) => {
    if ((Math.floor(Math.random() * 2)) === 0) {
      groups.first[0].append(createDebuff('images/High_Jump_target.png', 'high jump target'));
      groups.first[1].append(createDebuff('images/Elusive_Jump_target.png', 'elusive jump target'));
      groups.first[2].append(createDebuff('images/Spineshatter_Dive_target.png', 'spineshatter dive target'));
    } else {
      groups.first.forEach(char => {
        char.append(createDebuff('images/High_Jump_target.png', 'high jump target'));
      });
    }

    if ((Math.floor(Math.random() * 2)) === 0) {
      groups.second[0].append(createDebuff('images/Elusive_Jump_target.png', 'elusive jump target'));
      groups.second[1].append(createDebuff('images/Spineshatter_Dive_target.png', 'spineshatter dive target'));
    } else {
      groups.second.forEach(char => {
        char.append(createDebuff('images/High_Jump_target.png', 'high jump target'));
      });
    }

    if ((Math.floor(Math.random() * 2)) === 0) {
      groups.third[0].append(createDebuff('images/High_Jump_target.png', 'high jump target'));
      groups.third[1].append(createDebuff('images/Elusive_Jump_target.png', 'elusive jump target'));
      groups.third[2].append(createDebuff('images/Spineshatter_Dive_target.png', 'spinehsatter dive target'));
    } else {
      groups.third.forEach(char => {
        char.append(createDebuff('images/High_Jump_target.png', 'high jump target'));
      });
    }
  };

  const initEvents = () => {
    document.getElementById('nextStepButton').addEventListener('click', () => {
      const currentStep = document.getElementById('currentStep');
      const nextStep = currentStep.nextElementSibling;
      currentStep.className = "table-success";
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
        default:
          break;
      }
    })
  };

  onMount(() => {
    initEvents();
  });
</script>

<div class="position-absolute top-50 end-50">
  <img src={estinien} alt="estinien icon" class='boss-sizing face-north' />
</div>
