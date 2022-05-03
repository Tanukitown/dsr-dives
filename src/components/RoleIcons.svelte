<script lang="ts">
  import Moveable from "svelte-moveable";


  const tankIcon = 'images/Tank_Icon_Flat_1.png';
  const healerIcon = 'images/Healer_Icon_Flat_1.png';
  const meleeIcon = 'images/Melee_DPS_Icon_Flat_1.png';
  const magicRangedIcon = 'images/Magic_ranged_DPS_Icon_Flat_1.png';
  const physRangedIcon = 'images/Physical_Ranged_DPS_Flat_Icon_1.png';

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
</script>

<div>
  <div id="tankOne" class="character-with-debuffs text-center" on:click={setTarget}>
    <img src={tankIcon} alt="tank icon" class='icon-sizing' />
  </div>

  <div class="mt-2" />

  <div  id="tankTwo" class="character-with-debuffs text-center" on:click={setTarget}>
    <img src={tankIcon} alt="tank icon" class='icon-sizing' />
  </div>

  <div class="mt-2" />

  <div  id="healerOne" class="character-with-debuffs text-center" on:click={setTarget}>
    <img src={healerIcon} alt="healer icon" class='icon-sizing' />
  </div>

  <div class="mt-2" />

  <div  id="healerTwo" class="character-with-debuffs text-center" on:click={setTarget}>
    <img src={healerIcon} alt="healer icon" class='icon-sizing' />
  </div>

  <div class="mt-2" />

  <div  id="meleeOne" class="character-with-debuffs text-center" on:click={setTarget}>
    <img src={meleeIcon} alt="melee icon" class='icon-sizing' />
  </div>

  <div class="mt-2" />

  <div id="meleeTwo" class="character-with-debuffs text-center" on:click={setTarget}>
    <img src={meleeIcon} alt="melee icon" class='icon-sizing' />
  </div>

  <div class="mt-2" />

  <div id="magicRanged" class="character-with-debuffs text-center" on:click={setTarget}>
    <img src={magicRangedIcon} alt="magic ranged icon" class='icon-sizing' />
  </div>

  <div class="mt-2" />

  <div id="physRanged" class="character-with-debuffs text-center" on:click={setTarget}>
    <img src={physRangedIcon} alt="phys ranged icon" class='icon-sizing' />
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
