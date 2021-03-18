<template>
  <div
    class="editor-wrapper relative flex flex-col w-full h-full my-4 pt-4 px-4 border border-solid border-gray-400 border-opacity-20 shadow-md rounded-xl"
  >
    <span
      class="tag absolute inline-flex -top-3 -left-0.5 justify-center items-center bg-indigo-300 text-white font-bold rounded-xl text-center w-20 h-8 mr-auto text-sm"
      >개발중...</span
    >
    <div class="flex items-end">
      <div class="title-wrapper pt-4">
        <div class="title text-xl font-bold">에디터</div>
        <div class="description text-sm pl-1 pt-2 text-gray-600">
          메모를 작성해 주세요 🤓
        </div>
      </div>

      <div class="buttons flex ml-auto h-10">
        <button class="cursor-pointer text-white bg-gray-600 rounded-xl p-2">
          임시 저장
        </button>
        <button
          class="cursor-pointer inline-block text-center w-auto text-white p-2 ml-1 bg-pink-600 rounded-xl"
        >
          게시
        </button>
      </div>
    </div>
    <div class="text-xs text-gray-500 text-opacity-50 text-center mt-5">
      생성됨: 2021년 3월 11일 오전 5:15
    </div>
    <div class="editor max-w-4xl h-5/6">
      <div class="my-3 text-3xl text-gray-400 italic">제목을 입력해주세요</div>
      <div class="text-gray-400">본문을 입력해주세요</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="postcss" scoped>
</style>