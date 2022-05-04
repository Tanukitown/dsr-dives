<script lang="ts">
  import { onMount } from "svelte/internal";


  let step = 1;
  const estinien = 'images/estinien.png';

  const getMultipleRandom = (arr: Array<HTMLElement>, num: number) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}

  const stepOne = () => {
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

    const createDebuff = (img: string) => {
      const elem = document.createElement("img");
      elem.src = img;
      elem.setAttribute('class', 'debuff-sizing');
      elem.setAttribute('alt', 'first in line debuff');
      return elem;
    }

    const firstMarkers = getMultipleRandom(party, 3);
    party = party.filter( ( el ) => !firstMarkers.includes( el ) );
    const secondMarkers = getMultipleRandom(party, 2);
    party = party.filter( ( el ) => !secondMarkers.includes( el ) );

    firstMarkers.forEach(char => {
      char.append(createDebuff('images/First_In_Line.png'));
    })
    if ((Math.floor(Math.random() * 2)) === 0) {
      firstMarkers[0].append(createDebuff('images/High_Jump_target.png'));
      firstMarkers[1].append(createDebuff('images/Elusive_Jump_target.png'));
      firstMarkers[2].append(createDebuff('images/Spineshatter_Dive_target.png'));
    } else {
      firstMarkers.forEach(char => {
        char.append(createDebuff('images/High_Jump_target.png'));
      });
    }
    secondMarkers.forEach(char => {
      char.append(createDebuff('images/Second_In_Line.png'));
    })
    if ((Math.floor(Math.random() * 2)) === 0) {
      secondMarkers[0].append(createDebuff('images/Elusive_Jump_target.png'));
      secondMarkers[1].append(createDebuff('images/Spineshatter_Dive_target.png'));
    } else {
      secondMarkers.forEach(char => {
        char.append(createDebuff('images/High_Jump_target.png'));
      });
    }
    party.forEach(char => {
      char.append(createDebuff('images/Third_In_Line.png'));
    })
    if ((Math.floor(Math.random() * 2)) === 0) {
      party[0].append(createDebuff('images/High_Jump_target.png'));
      party[1].append(createDebuff('images/Elusive_Jump_target.png'));
      party[2].append(createDebuff('images/Spineshatter_Dive_target.png'));
    } else {
      party.forEach(char => {
        char.append(createDebuff('images/High_Jump_target.png'));
      });
    }
  };

  const stepTwo = () => {
    //
  }

  const initEvents = () => {
    document.getElementById('nextStepButton').addEventListener('click', () => {
      const currentStep = document.getElementById('currentStep');
      const nextStep = currentStep.nextElementSibling;
      currentStep.className = "table-success";
      currentStep.removeAttribute('id');
      nextStep.className = 'table-secondary';
      nextStep.id = 'currentStep';
      step = step + 1;
      switch (step) {
        case 2:
          stepTwo();
      }
    })
  };

  onMount(() => {
    initEvents();
    stepOne();
  });
</script>

<div class="position-absolute top-50 end-50">
  <img src={estinien} alt="estinien icon" class='boss-sizing face-north' />
</div>
