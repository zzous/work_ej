<template>
  <div class="workflow-page">
    <v-card class="workflow-card" elevation="2">
      <!-- 헤더 -->
      <div class="workflow-header">
        <h2 class="workflow-title">
          <v-icon icon="mdi-file-document-multiple" class="mr-2"></v-icon>
          워크플로우목록 ({{ totalWorkflows }})
        </h2>
        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          @click="createWorkflow"
        >
          워크플로우 생성
        </v-btn>
      </div>

      <!-- 검색 및 필터 영역 -->
      <div class="search-bar">
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          placeholder="제목으로 검색"
          variant="outlined"
          density="compact"
          hide-details
          clearable
          class="search-field"
        ></v-text-field>

        <div class="filter-controls">
          <span class="date-display">Date : {{ new Date().toLocaleString('sv-SE').replace('T', ' ').substring(0, 19) }}</span>
          <v-select
            v-model="itemsPerPage"
            :items="[10, 20, 50, 100]"
            variant="outlined"
            density="compact"
            hide-details
            class="items-per-page"
          ></v-select>
        </div>
      </div>

      <!-- 데이터 테이블 -->
      <v-data-table
        :headers="headers"
        :items="workflows"
        :search="search"
        :items-per-page="itemsPerPage"
        :items-per-page-options="[]"
        class="workflow-table"
        hover
      >
        <!-- 문서번호 컬럼 -->
        <template #[`item.id`]="{ item }">
          <span class="doc-number">{{ item.id }}</span>
        </template>

        <!-- 워크플로우명 컬럼 (클릭 가능한 링크) -->
        <template #[`item.name`]="{ item }">
          <a href="#" class="workflow-link" @click.prevent="viewWorkflow(item)">
            {{ item.name }}
            <v-icon icon="mdi-open-in-new" size="small" class="ml-1"></v-icon>
          </a>
        </template>

        <!-- 업무유형 컬럼 -->
        <template #[`item.type`]="{ item }">
          <span class="workflow-type">{{ item.type }}</span>
        </template>

        <!-- 작성일자 컬럼 -->
        <template #[`item.createdAt`]="{ item }">
          <span class="created-date">{{ item.createdAt }}</span>
        </template>

        <!-- 데이터 없을 때 -->
        <template #[`no-data`]>
          <div class="text-center pa-8">
            <v-icon icon="mdi-inbox" size="64" color="grey-lighten-1"></v-icon>
            <p class="text-h6 text-grey mt-4">등록된 워크플로우가 없습니다</p>
          </div>
        </template>

        <!-- 검색 결과 없을 때 -->
        <template #[`no-results`]>
          <div class="text-center pa-8">
            <v-icon icon="mdi-magnify-close" size="64" color="grey-lighten-1"></v-icon>
            <p class="text-h6 text-grey mt-4">검색 결과가 없습니다</p>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 테이블 헤더 정의
const headers = [
  { title: '문서번호', key: 'id', align: 'center', width: '120' },
  { title: '워크 플로우 명', key: 'name', align: 'start' },
  { title: '업무유형', key: 'type', align: 'center', width: '150' },
  { title: '작성일자', key: 'createdAt', align: 'center', width: '200' }
]

// 워크플로우 목록 데이터
const workflows = ref([
  {
    id: 420,
    name: '일반변경관리',
    type: '변경관리',
    createdAt: '2025-07-17 08:50:13'
  },
  {
    id: 413,
    name: '표준변경관리',
    type: '변경관리',
    createdAt: '2024-11-13 14:41:38'
  },
  {
    id: 412,
    name: '긴급변경관리',
    type: '변경관리',
    createdAt: '2024-11-13 14:40:29'
  }
])

// 검색어
const search = ref('')

// 페이지당 항목 수
const itemsPerPage = ref(10)

// 워크플로우 총 개수
const totalWorkflows = computed(() => workflows.value.length)

// 워크플로우 생성 (페이지로 이동)
const createWorkflow = () => {
  router.push('/workflow/create')
}

// 워크플로우 클릭 (상세보기)
const viewWorkflow = (workflow) => {
  console.log('워크플로우 상세:', workflow)
  // 여기에 상세 페이지 이동 로직 추가
}
</script>

<style scoped lang="scss" src="./WorkflowView.scss"></style>
