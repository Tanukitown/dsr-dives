<script lang="ts">
  import Moveable from "svelte-moveable";


  const tankIcon = 'images/Tank_Icon_Flat_1.png';
  const healerIcon = 'images/Healer_Icon_Flat_1.png';
  const meleeIcon = 'images/Melee_DPS_Icon_Flat_1.png';
  const magicRangedIcon = 'images/Magic_Ranged_DPS_Icon_Flat_1.png';
  const physRangedIcon = 'images/Physical_Ranged_DPS_Flat_Icon_1.png';
  const one = 'images/waymark1.png';
  const two = 'images/waymark2.png';
  const three = 'images/waymark3.png';
  const four = 'images/waymark4.png';
  const a = 'images/waymarkA.png';
  const b = 'images/waymarkB.png';
  const c = 'images/waymarkC.png';
  const d = 'images/waymarkD.png';

  let target;
  let tankOneFrame = {
    translate: [0,0],
    rotate: 0,
    transformOrigin: "50% 50%",
  }
  let tankTwoFrame = {
    translate: [0,0],
    rotate: 0,
    transformOrigin: "50% 50%",
  }
  let healerOneFrame = {
    translate: [0,0],
    rotate: 0,
    transformOrigin: "50% 50%",
  }
  let healerTwoFrame = {
    translate: [0,0],
    rotate: 0,
    transformOrigin: "50% 50%",
  }
  let meleeOneFrame = {
    translate: [0,0],
    rotate: 0,
    transformOrigin: "50% 50%",
  }
  let meleeTwoFrame = {
    translate: [0,0],
    rotate: 0,
    transformOrigin: "50% 50%",
  }
  let magicRangedFrame = {
    translate: [0,0],
    rotate: 0,
    transformOrigin: "50% 50%",
  }
  let physRangedFrame = {
    translate: [0,0],
    rotate: 0,
    transformOrigin: "50% 50%",
  }
  let oneFrame = {
    translate: [0,0],
    rotate: 0,
    transformOrigin: "50% 50%",
  }
  let twoFrame = {
    translate: [0,0],
    rotate: 0,
    transformOrigin: "50% 50%",
  }
  let threeFrame = {
    translate: [0,0],
    rotate: 0,
    transformOrigin: "50% 50%",
  }
  let fourFrame = {
    translate: [0,0],
    rotate: 0,
    transformOrigin: "50% 50%",
  }
  let aFrame = {
    translate: [0,0],
    rotate: 0,
    transformOrigin: "50% 50%",
  }
  let bFrame = {
    translate: [0,0],
    rotate: 0,
    transformOrigin: "50% 50%",
  }
  let cFrame = {
    translate: [0,0],
    rotate: 0,
    transformOrigin: "50% 50%",
  }
  let dFrame = {
    translate: [0,0],
    rotate: 0,
    transformOrigin: "50% 50%",
  }
  const selectedFrame = (target: HTMLElement) => {
    switch (target.id) {
      case 'tankOne':
        return tankOneFrame
      case 'tankTwo':
        return tankTwoFrame
      case 'healerOne':
        return healerOneFrame
      case 'healerTwo':
        return healerTwoFrame
      case 'meleeOne':
        return meleeOneFrame
      case 'meleeTwo':
        return meleeTwoFrame
      case 'magicRanged':
        return magicRangedFrame
      case 'physRanged':
        return physRangedFrame
        case 'oneMarker':
        return oneFrame
      case 'twoMarker':
        return twoFrame
      case 'threeMarker':
        return threeFrame
      case 'fourMarker':
        return fourFrame
      case 'aMarker':
        return aFrame
      case 'bMarker':
        return bFrame
      case 'cMarker':
        return cFrame
      case 'dMarker':
        return dFrame
    }
  };
  const setTarget = (e: Event) => {
    const toMove = e.currentTarget as HTMLElement;
    target = toMove;
    Array.from(document.querySelectorAll('.target')).forEach((el) => el.classList.remove('target'));
    toMove.classList.add('target');
  };
  const clearTarget = () => {
    target = null;
    Array.from(document.querySelectorAll('.target')).forEach((el) => el.classList.remove('target'));
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if ('key' in e) {
      if (e.key === 'Escape' || e.key === 'Esc') clearTarget();
    }
  }
</script>


<svelte:window on:keydown={handleKeydown}/>

<div class="d-flex justify-content-between position-absolute start-0 w-100">
  <div id="tankOne" class="position-relative character-with-debuffs text-center" on:click={setTarget}>
    <img src={tankIcon} alt="tank icon" class='icon-sizing' />
  </div>

  <div  id="tankTwo" class="position-relative character-with-debuffs text-center" on:click={setTarget}>
    <img src={tankIcon} alt="tank icon" class='icon-sizing' />
  </div>

  <div  id="healerOne" class="position-relative character-with-debuffs text-center" on:click={setTarget}>
    <img src={healerIcon} alt="healer icon" class='icon-sizing' />
  </div>

  <div  id="healerTwo" class="position-relative character-with-debuffs text-center" on:click={setTarget}>
    <img src={healerIcon} alt="healer icon" class='icon-sizing' />
  </div>

  <div  id="meleeOne" class="position-relative character-with-debuffs text-center" on:click={setTarget}>
    <img src={meleeIcon} alt="melee icon" class='icon-sizing' />
  </div>

  <div id="meleeTwo" class="position-relative character-with-debuffs text-center" on:click={setTarget}>
    <img src={meleeIcon} alt="melee icon" class='icon-sizing' />
  </div>

  <div id="magicRanged" class="position-relative character-with-debuffs text-center" on:click={setTarget}>
    <img src={magicRangedIcon} alt="magic ranged icon" class='icon-sizing' />
  </div>

  <div id="physRanged" class="position-relative character-with-debuffs text-center" on:click={setTarget}>
    <img src={physRangedIcon} alt="phys ranged icon" class='icon-sizing' />
  </div>
</div>

<div class="d-flex justify-content-between position-absolute start-0 bottom-0 w-100">
  <div id="oneMarker" class="position-relative world-marker text-center" on:click={setTarget}>
    <img src={one} alt="waymark one" class='icon-sizing' />
  </div>

  <div  id="twoMarker" class="position-relative world-marker text-center" on:click={setTarget}>
    <img src={two} alt="wayark two" class='icon-sizing' />
  </div>

  <div  id="threeMarker" class="position-relative world-marker text-center" on:click={setTarget}>
    <img src={three} alt="waymark three" class='icon-sizing' />
  </div>

  <div  id="fourMarker" class="position-relative world-marker text-center" on:click={setTarget}>
    <img src={four} alt="waymark four" class='icon-sizing' />
  </div>

  <div  id="aMarker" class="position-relative world-marker text-center" on:click={setTarget}>
    <img src={a} alt="waymark a" class='icon-sizing' />
  </div>

  <div id="bMarker" class="position-relative world-marker text-center" on:click={setTarget}>
    <img src={b} alt="waymark b" class='icon-sizing' />
  </div>

  <div id="cMarker" class="position-relative world-marker text-center" on:click={setTarget}>
    <img src={c} alt="waymark c" class='icon-sizing' />
  </div>

  <div id="dMarker" class="position-relative world-marker text-center" on:click={setTarget}>
    <img src={d} alt="waymark d" class='icon-sizing' />
  </div>
</div>

<Moveable
  target={target}
  originDraggable={false}
  originRelative={true}
  draggable={true}
  throttleDrag={0}
  startDragRotate={0}
  throttleDragRotate={0}
  zoom={1}
  origin={true}
  padding={{"left":0,"top":0,"right":0,"bottom":0}}
  rotatable={true}
  throttleRotate={0}
  rotationPosition={"top"}
  on:dragOriginStart={({ detail: e }) => {
    e.dragStart && e.dragStart.set(selectedFrame(target).translate);
  }}
  on:dragOrigin={({ detail: e }) => {
      selectedFrame(target).translate = e.drag.beforeTranslate;
      selectedFrame(target).transformOrigin = e.transformOrigin;
  }}
  on:dragStart={({ detail: e }) => {
      e.set(selectedFrame(target).translate);
  }}
  on:drag={({ detail: e }) => {
      selectedFrame(target).translate = e.beforeTranslate;
  }}
  on:rotateStart={({ detail: e }) => {
      e.set(selectedFrame(target).rotate);
  }}
  on:rotate={({ detail: e }) => {
      selectedFrame(target).rotate = e.beforeRotate;
  }}
  on:render={({ detail: e }) => {
      const { translate, rotate, transformOrigin } = selectedFrame(target);
      e.target.style.transformOrigin = transformOrigin;
      e.target.style.transform = `translate(${translate[0]}px, ${translate[1]}px)`
          +  ` rotate(${rotate}deg)`;
  }}
/>
