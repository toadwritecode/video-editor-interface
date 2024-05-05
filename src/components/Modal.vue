<template>
  <transition name="modal">
    <div class="modal-mask">
      <div
          @keydown.esc="$emit('close')"
          tabindex="0"
          @click="$emit('close')"
          class="modal-wrapper"
      >
        <div @click.stop="" class="modal-container">
          <slot name="inner"></slot>
          <div class="modal-header">
            <slot name="header"> default header </slot>
          </div>

          <div class="modal-body">
            <slot name="body"> default body </slot>
          </div>

          <div class="modal__close" @click="$emit('close')">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="10px"
                viewBox="0 0 329.26933 329"
                width="10px"
            >
              <path
                  d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "modal",
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  position: relative;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.modal__close {
  position: absolute;
  right: 25px;
  top: 22px;
  transition: 0.2s;
}

.modal__close:hover {
  fill: #ff6163;
  transform: scale(1.2);
  cursor: pointer;
}
</style>
