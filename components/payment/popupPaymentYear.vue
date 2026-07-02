<template>
  <el-popconfirm
    confirm-button-text="Có"
    cancel-button-text="Không"
    :icon="InfoFilled"
    width="250"
    icon-color="#626AEF"
    title="Luận giải lá số theo năm sẽ tốn 20.000đ, bạn có muốn tiếp tục?"
    @confirm="onRun()"
  >
    <template #reference>
      <el-button class="horoscope-popup-payment mt-4" type="primary">
        Luận giải năm
      </el-button>
    </template>
  </el-popconfirm>
</template>
<script setup>
import { InfoFilled } from '@element-plus/icons-vue'

defineProps({
  onRun: Function,
})
</script>
