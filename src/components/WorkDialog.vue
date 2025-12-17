<template>
  <v-dialog :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)" max-width="600">
    <v-card>
      <v-card-title class="pa-6 bg-primary">
        <div class="d-flex align-center">
          <v-icon :icon="isEditMode ? 'mdi-pencil' : 'mdi-briefcase-plus'" color="white" class="mr-2"></v-icon>
          <span class="text-h5 text-white">{{ dialogTitle }}</span>
        </div>
      </v-card-title>

      <v-card-text class="pa-6">
        <v-text-field
          :model-value="groupName"
          label="WORK 그룹명"
          prepend-inner-icon="mdi-folder"
          variant="outlined"
          readonly
          class="mb-4"
        ></v-text-field>

        <!-- 등록 모드: WORK 선택 가능 -->
        <v-select
          v-if="!isEditMode"
          v-model="selectedWork"
          :items="availableOptions"
          item-title="name"
          item-value="value"
          label="WORK 선택"
          prepend-inner-icon="mdi-briefcase"
          variant="outlined"
          placeholder="WORK를 선택하세요"
          :rules="[v => !!v || 'WORK 선택은 필수입니다']"
          class="mb-4"
        ></v-select>

        <!-- 수정 모드: WORK 선택 읽기 전용 -->
        <v-text-field
          v-else
          :model-value="selectedWorkName"
          label="WORK 선택"
          prepend-inner-icon="mdi-briefcase"
          variant="outlined"
          readonly
          class="mb-4"
          bg-color="grey-lighten-4"
        ></v-text-field>

        <v-checkbox
          v-model="workPayment"
          label="결제 여부"
          hide-details
          class="mb-4"
        ></v-checkbox>

        <v-textarea
          v-model="workDescription"
          label="설명"
          prepend-inner-icon="mdi-text"
          variant="outlined"
          rows="4"
          placeholder="WORK 설명을 입력하세요"
        ></v-textarea>
      </v-card-text>

      <v-card-actions class="pa-6 pt-0">
        <v-spacer></v-spacer>
        <v-btn
          variant="text"
          size="large"
          @click="closeDialog"
        >
          취소
        </v-btn>
        <v-btn
          color="primary"
          variant="elevated"
          size="large"
          prepend-icon="mdi-check"
          :disabled="!selectedWork"
          @click="saveWork"
        >
          {{ saveButtonText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  groupName: {
    type: String,
    default: ''
  },
  availableOptions: {
    type: Array,
    default: () => []
  },
  mode: {
    type: String,
    default: 'create' // 'create' or 'edit'
  },
  editData: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'save', 'update'])

const selectedWork = ref('')
const workPayment = ref(false)
const workDescription = ref('')

const isEditMode = computed(() => props.mode === 'edit')
const dialogTitle = computed(() => isEditMode.value ? 'WORK 수정' : 'WORK 등록')
const saveButtonText = computed(() => isEditMode.value ? '수정' : '등록')

// 수정 모드일 때 선택된 WORK의 이름 표시
const selectedWorkName = computed(() => {
  if (isEditMode.value && props.editData) {
    return props.editData.name
  }
  const work = props.availableOptions.find(opt => opt.value === selectedWork.value)
  return work ? work.name : ''
})

// 다이얼로그가 열릴 때 초기화 또는 데이터 로드
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    if (isEditMode.value && props.editData) {
      // 수정 모드: 기존 데이터 로드
      selectedWork.value = props.editData.value
      workPayment.value = props.editData.payment || false
      workDescription.value = props.editData.description || ''
    } else {
      // 등록 모드: 초기화
      selectedWork.value = ''
      workPayment.value = false
      workDescription.value = ''
    }
  }
})

const closeDialog = () => {
  emit('update:modelValue', false)
}

const saveWork = () => {
  if (selectedWork.value) {
    const workData = {
      value: selectedWork.value,
      payment: workPayment.value,
      description: workDescription.value
    }
    
    if (isEditMode.value) {
      emit('update', workData)
    } else {
      emit('save', workData)
    }
    closeDialog()
  }
}
</script>

<style scoped>
/* 필요한 경우 스타일 추가 */
</style>
