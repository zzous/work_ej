<template>
  <div class="workflow-create-page">
    <v-card class="workflow-create-card" elevation="2">
      <!-- 헤더 -->
      <div class="page-header">
        <h2 class="page-title">
          <v-icon icon="mdi-file-document-edit" class="mr-2"></v-icon>
          워크플로우 생성
        </h2>
      </div>

      <!-- 안내 메시지 -->
      <div class="info-box">
        <v-icon icon="mdi-information" class="info-icon"></v-icon>
        <div class="info-text">
          <p>- 등록할 워크 플로우의 기본 정보 입력 후 워크 플로우를 지정할 수 있습니다.</p>
          <p>- 워크 플로우는 "변경요청 등록" 으로 시작해서 "변경종료" 로 끝나야 합니다.</p>
        </div>
      </div>

      <!-- 폼 영역 -->
      <div class="form-content">
        <!-- 워크플로우명 -->
        <v-row class="form-row">
          <v-col cols="12" md="2" class="label-col">
            <label class="form-label">
              워크플로우명
              <span class="required">*</span>
            </label>
          </v-col>
          <v-col cols="12" md="10">
            <v-text-field
              v-model="workflowName"
              variant="outlined"
              density="comfortable"
              hide-details
              placeholder="워크플로우명을 입력하세요"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- 워크플로우 설명 -->
        <v-row class="form-row">
          <v-col cols="12" md="2" class="label-col">
            <label class="form-label">워크플로우 설명</label>
          </v-col>
          <v-col cols="12" md="10">
            <v-textarea
              v-model="workflowDescription"
              variant="outlined"
              rows="4"
              hide-details
              placeholder="워크플로우 설명을 입력하세요"
            ></v-textarea>
          </v-col>
        </v-row>

        <!-- 워크플로우그룹명 -->
        <v-row class="form-row">
          <v-col cols="12" md="2" class="label-col">
            <label class="form-label">워크플로우그룹명</label>
          </v-col>
          <v-col cols="12" md="10">
            <div class="d-flex align-center">
              <v-text-field
                v-model="workflowGroup"
                variant="outlined"
                density="comfortable"
                hide-details
                class="group-field"
                placeholder="그룹명을 입력하세요"
              ></v-text-field>
              <v-btn
                variant="outlined"
                class="ml-2 group-btn"
                prepend-icon="mdi-view-list"
                :disabled="!workflowGroup || workflowGroup.trim() === ''"
                @click="addGroup"
              >
                그룹추가
              </v-btn>
            </div>
          </v-col>
        </v-row>

        <!-- 워크플로우 설정 -->
        <v-row class="form-row workflow-settings-row">
          <v-col cols="12">
            <label class="form-label mb-4">워크플로우 설정</label>
            
            <!-- 그룹이 없을 때 -->
            <div v-if="workflowGroups.length === 0" class="empty-groups">
              <v-icon icon="mdi-image-outline" size="64" color="grey-lighten-1"></v-icon>
              <p class="empty-text">등록된 그룹이 없습니다. 그룹을 추가해 주세요</p>
            </div>

            <!-- 그룹 목록 -->
            <div v-else class="group-list">
              <div
                v-for="(group, index) in workflowGroups"
                :key="index"
                class="group-item"
                :class="{ 'full-width': workflowGroups.length === 1 }"
              >
                <div class="group-header">
                  <span class="group-number">{{ index + 1 }}</span>
                  <span class="group-name">{{ group.name }}</span>
                  <div class="group-actions">
                    <v-btn
                      icon="mdi-plus"
                      size="small"
                      variant="text"
                      @click="openWorkDialog(index)"
                    ></v-btn>
                    <v-btn
                      icon="mdi-minus"
                      size="small"
                      variant="text"
                      @click="removeGroup(index)"
                    ></v-btn>
                  </div>
                </div>
                
                <!-- WORK 목록 -->
                <div v-if="group.works.length > 0" class="work-list" :class="{ 'horizontal': workflowGroups.length === 1 }">
                  <div
                    v-for="(work, workIndex) in group.works"
                    :key="workIndex"
                    class="work-item-card"
                  >
                    <div class="work-item-header">
                      <div class="work-number-badge">{{ workIndex + 1 }}</div>
                      <span class="work-label">{{ work.name }}</span>
                    </div>
                    
                    <div class="work-item-content">
                      <div class="work-value">*{{ work.value }}</div>
                    </div>

                    <div v-if="work.description" class="work-description-section">
                      <v-icon icon="mdi-file-document-outline" size="small" color="#666" class="mr-2"></v-icon>
                      <span class="work-description">{{ work.description }}</span>
                    </div>

                    <div class="work-item-footer">
                      <div v-if="work.payment" class="work-payment">
                        <v-icon 
                          icon="mdi-account" 
                          size="small" 
                          color="#f57c00"
                          class="mr-1"
                        ></v-icon>
                        <span class="payment-label">결제</span>
                      </div>
                      
                      <div class="work-actions" :class="{ 'ml-auto': !work.payment }">
                        <v-btn
                          icon="mdi-pencil"
                          size="x-small"
                          variant="text"
                          color="primary"
                          @click="editWork(index, workIndex)"
                        ></v-btn>
                        <v-btn
                          icon="mdi-delete"
                          size="x-small"
                          variant="text"
                          color="error"
                          @click="removeWork(index, workIndex)"
                        ></v-btn>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- 하단 버튼 -->
      <div class="action-buttons">
        <v-btn
          color="primary"
          size="large"
          prepend-icon="mdi-content-save"
          @click="saveWorkflow"
          class="action-btn"
        >
          저장
        </v-btn>
        <v-btn
          variant="outlined"
          size="large"
          prepend-icon="mdi-format-list-bulleted"
          @click="goToList"
          class="action-btn ml-3"
        >
          목록
        </v-btn>
      </div>
    </v-card>

    <!-- 저장 데이터 미리보기 영역 -->
    <v-card v-if="showSavedData" class="saved-data-card mt-6" elevation="2">
      <v-card-title class="d-flex align-center justify-space-between bg-grey-lighten-4 pa-4">
        <div class="d-flex align-center">
          <v-icon icon="mdi-code-json" class="mr-2" color="primary"></v-icon>
          <span class="text-h6">저장 데이터 (JSON)</span>
        </div>
        <v-btn
          icon="mdi-close"
          variant="text"
          size="small"
          @click="showSavedData = false"
        ></v-btn>
      </v-card-title>
      <v-card-text class="pa-0">
        <pre class="saved-data-content">{{ JSON.stringify(savedDataPreview, null, 2) }}</pre>
      </v-card-text>
    </v-card>

    <!-- WORK 등록/수정 다이얼로그 -->
    <WorkDialog
      v-model="workDialog"
      :mode="workDialogMode"
      :group-name="currentGroupName"
      :available-options="availableWorkOptions"
      :edit-data="editingWork"
      @save="saveWork"
      @update="updateWork"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import WorkDialog from '@/components/WorkDialog.vue'

const router = useRouter()

// 폼 데이터
const workflowName = ref('')
const workflowDescription = ref('')
const workflowGroup = ref('')

// 워크플로우 그룹 목록 (각 그룹은 { name: string, works: [] } 형태)
const workflowGroups = ref([])

// WORK 옵션 목록
const workOptions = [
  { value: 'CHANGE_REQUEST', name: '영향도 분석/위험 평가' },
  { value: 'CHANGE_PLANNING', name: '변경계획 수립' },
  { value: 'CHANGE_APPROVAL', name: '변경 승인' },
  { value: 'CHANGE_EXECUTION', name: '변경 실행' },
  { value: 'VERIFICATION_VALIDATION', name: '검증 및 확인' },
  { value: 'CHANGE_REVIEW', name: '변경결과 리뷰' },
  { value: 'CHANGE_COMPLETION', name: '변경 종료' }
]

// WORK 등록/수정 다이얼로그
const workDialog = ref(false)
const workDialogMode = ref('create') // 'create' or 'edit'
const currentGroupIndex = ref(null)
const currentWorkIndex = ref(null)
const editingWork = ref(null)

// 워크플로우 그룹 옵션
const groupOptions = ['변경관리', '인시던트관리', '문제관리', '요청관리']

// 드래그앤드롭 관련
const isDragging = ref(false)
const uploadedFiles = ref([])

// 저장 데이터 미리보기
const savedDataPreview = ref(null)
const showSavedData = ref(false)

// 그룹 추가
const addGroup = () => {
  if (workflowGroup.value && workflowGroup.value.trim()) {
    workflowGroups.value.push({
      name: workflowGroup.value.trim(),
      works: []
    })
    workflowGroup.value = ''
  }
}

// 그룹 삭제
const removeGroup = (index) => {
  workflowGroups.value.splice(index, 1)
}

// WORK 추가 다이얼로그 열기
const openWorkDialog = (groupIndex) => {
  workDialogMode.value = 'create'
  currentGroupIndex.value = groupIndex
  currentWorkIndex.value = null
  editingWork.value = null
  workDialog.value = true
}

// 사용 가능한 WORK 옵션 (모든 그룹에서 이미 선택된 것 제외)
const availableWorkOptions = computed(() => {
  const selectedWorks = workflowGroups.value
    .flatMap(group => group.works.map(w => w.value))
  
  return workOptions.filter(option => !selectedWorks.includes(option.value))
})

// 현재 선택된 그룹 이름
const currentGroupName = computed(() => {
  return currentGroupIndex.value !== null 
    ? workflowGroups.value[currentGroupIndex.value]?.name || ''
    : ''
})

// WORK 저장 (등록)
const saveWork = (workData) => {
  if (currentGroupIndex.value !== null) {
    const work = workOptions.find(w => w.value === workData.value)
    if (work) {
      workflowGroups.value[currentGroupIndex.value].works.push({
        ...work,
        payment: workData.payment,
        description: workData.description
      })
    }
  }
}

// WORK 업데이트 (수정)
const updateWork = (workData) => {
  if (currentGroupIndex.value !== null && currentWorkIndex.value !== null) {
    const work = workflowGroups.value[currentGroupIndex.value].works[currentWorkIndex.value]
    // value와 name은 유지하고 payment와 description만 업데이트
    work.payment = workData.payment
    work.description = workData.description
  }
}

// WORK 편집
const editWork = (groupIndex, workIndex) => {
  workDialogMode.value = 'edit'
  currentGroupIndex.value = groupIndex
  currentWorkIndex.value = workIndex
  editingWork.value = { ...workflowGroups.value[groupIndex].works[workIndex] }
  workDialog.value = true
}

// WORK 삭제
const removeWork = (groupIndex, workIndex) => {
  workflowGroups.value[groupIndex].works.splice(workIndex, 1)
}

// 파일 드래그 이벤트
const handleDragEnter = () => {
  isDragging.value = true
}

const handleDragLeave = () => {
  isDragging.value = false
}

const handleDrop = (e) => {
  isDragging.value = false
  const files = Array.from(e.dataTransfer.files)
  uploadedFiles.value = [...uploadedFiles.value, ...files]
}

// 파일 선택
const handleFileSelect = (e) => {
  const files = Array.from(e.target.files)
  uploadedFiles.value = [...uploadedFiles.value, ...files]
}

// 파일 제거
const removeFile = (index) => {
  uploadedFiles.value.splice(index, 1)
}

// 저장
const saveWorkflow = () => {
  if (!workflowName.value) {
    alert('워크플로우명을 입력해주세요.')
    return
  }

  if (workflowGroups.value.length === 0) {
    alert('최소 1개 이상의 워크플로우 그룹을 추가해주세요.')
    return
  }

  // 각 그룹에 WORK가 있는지 체크
  const emptyGroups = workflowGroups.value
    .map((group, index) => ({ group, index }))
    .filter(({ group }) => group.works.length === 0)
  
  if (emptyGroups.length > 0) {
    const groupNames = emptyGroups
      .map(({ group, index }) => `"${group.name}" (그룹 ${index + 1})`)
      .join(', ')
    alert(`다음 그룹에 WORK를 추가해주세요:\n${groupNames}`)
    return
  }

  // JSON 데이터 구조 생성
  const saveData = {
    wfName: workflowName.value,
    wfDesc: workflowDescription.value || '',
    serviceGroupUuid: 'service-group-uuid-001', // TODO: 실제 UUID로 교체 필요
    wfGroupList: workflowGroups.value.map((group, groupIndex) => ({
      wfGroupName: group.name,
      wfGroupDesc: '', // 현재 워크 그룹 설명 필드가 없으므로 빈 문자열
      displayOrder: groupIndex + 1,
      wfGroupItemList: group.works.map((work, workIndex) => ({
        wfComponentsCode: work.value,
        wfGroupItemDesc: work.description || '',
        approvalYn: work.payment ? 'Y' : 'N',
        displayOrder: workIndex + 1
      }))
    }))
  }

  // 저장 데이터 출력 (콘솔)
  console.log('저장 데이터:', JSON.stringify(saveData, null, 2))
  
  // 저장 데이터 미리보기 영역에 표시
  savedDataPreview.value = saveData
  showSavedData.value = true
  
  // 저장 완료 메시지
  alert('워크플로우 저장 데이터가 하단에 표시되었습니다.')

  // 페이지 하단으로 스크롤
  setTimeout(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }, 100)

  // 목록으로 이동
  // router.push('/')
}

// 목록으로 돌아가기
const goToList = () => {
  router.push('/')
}
</script>

<style scoped lang="scss" src="./WorkflowCreateView.scss"></style>
