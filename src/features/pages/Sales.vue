<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useSales } from "../entities/hooks/useSales";
import { format, subDays } from "date-fns";
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Paginator from "primevue/paginator";
import Calendar from "primevue/calendar";

// Регистрация компонентов Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// Состояние для фильтров и переключения вида
const viewMode = ref<"table" | "chart">("table");
const warehouseFilter = ref("");
const articleFilter = ref("");
const dateFromFilter = ref<Date>(subDays(new Date(), 1)); // Вчера
const dateToFilter = ref<Date>(new Date()); // Сегодня
const currentPage = ref(1);
const limit = ref(10);

// Форматирование дат
const today = format(new Date(), "yyyy-MM-dd");
const yesterday = format(subDays(new Date(), 1), "yyyy-MM-dd");

// Получение данных с хука
const { data, isFetching, setPage, setLimit, setDateRange, refetch } = useSales({
  config: {
    dateFrom: yesterday,
    dateTo: today,
    page: currentPage.value,
    limit: limit.value,
  },
});

// Проверка ответа API
watch(
    () => data.value?.meta,
    (meta) => {
      if (meta && parseInt(meta.per_page) !== limit.value) {
        console.warn(`API returned per_page: ${meta.per_page}, expected: ${limit.value}`);
      }
    }
);

// Вычисляем данные для графика
const chartData = computed(() => {
  if (!data.value?.data) return { labels: [], datasets: [] };
  const labels = data.value.data.map((item) => item.supplier_article);
  const values = data.value.data.map((item) => parseFloat(item.total_price));
  return {
    labels,
    datasets: [
      {
        label: "Total Price",
        backgroundColor: "#42A5F5",
        data: values,
      },
    ],
  };
});

// Настройки графика
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

// Обработка фильтров
const applyFilters = () => {
  const dateFromStr = dateFromFilter.value ? format(dateFromFilter.value, "yyyy-MM-dd") : yesterday;
  const dateToStr = dateToFilter.value ? format(dateToFilter.value, "yyyy-MM-dd") : today;
  setDateRange(dateFromStr, dateToStr);
  setPage(1);
  refetch();
};

// Обработка пагинации
const onPageChange = (event: { page: number; rows: number }) => {
  setPage(event.page + 1); // PrimeVue Paginator использует 0-based индекс
  if (event.rows !== limit.value) {
    setLimit(event.rows);
    limit.value = event.rows;
  }
  currentPage.value = event.page + 1;
  refetch();
};

// Фильтрация данных для таблицы
const filteredData = computed(() => {
  if (!data.value?.data) return [];
  return data.value.data.filter((item) => {
    const matchesWarehouse = warehouseFilter.value
        ? item.warehouse_name.toLowerCase().includes(warehouseFilter.value.toLowerCase())
        : true;
    const matchesArticle = articleFilter.value
        ? item.supplier_article.toLowerCase().includes(articleFilter.value.toLowerCase())
        : true;
    return matchesWarehouse && matchesArticle;
  });
});
</script>

<template>
    <!-- Фильтры и переключение вида -->
    <div class="flex flex-col sm:flex-row gap-4 mb-4">
      <InputText
          v-model="warehouseFilter"
          placeholder="Фильтр по складу"
          class="p-inputtext-sm w-full sm:w-64"
          @input="applyFilters"
      />
      <InputText
          v-model="articleFilter"
          placeholder="Фильтр по артикулу"
          class="p-inputtext-sm w-full sm:w-64"
          @input="applyFilters"
      />
      <Calendar
          v-model="dateFromFilter"
          placeholder="Дата от"
          dateFormat="yy-mm-dd"
          :showIcon="true"
          class="w-full sm:w-64"
          @update:modelValue="applyFilters"
      />
      <Calendar
          v-model="dateToFilter"
          placeholder="Дата до"
          dateFormat="yy-mm-dd"
          :showIcon="true"
          class="w-full sm:w-64"
          @update:modelValue="applyFilters"
      />
      <div class="flex gap-2">
        <Button
            :label="viewMode === 'table' ? 'Показать график' : 'Показать таблицу'"
            class="p-button-sm p-button-primary"
            @click="viewMode = viewMode === 'table' ? 'chart' : 'table'"
        />
      </div>
    </div>

    <!-- Индикатор загрузки -->
    <div v-if="isFetching" class="text-center text-gray-500">Загрузка...</div>

    <!-- Таблица -->
    <div v-if="viewMode === 'table' && !isFetching">
      <DataTable :value="filteredData" class="p-datatable-sm" responsiveLayout="scroll">
        <Column field="g_number" header="Номер" sortable></Column>
        <Column field="date" header="Дата" sortable></Column>
        <Column field="last_change_date" header="Дата изменения" sortable></Column>
        <Column field="supplier_article" header="Артикул" sortable></Column>
        <Column field="tech_size" header="Размер" sortable></Column>
        <Column field="barcode" header="Штрихкод" sortable></Column>
        <Column field="total_price" header="Цена" sortable></Column>
        <Column field="discount_percent" header="Скидка (%)" sortable></Column>
        <Column field="is_supply" header="Поставка" sortable></Column>
        <Column field="is_realization" header="Реализация" sortable></Column>
        <Column field="promo_code_discount" header="Скидка по промокоду" sortable></Column>
        <Column field="warehouse_name" header="Склад" sortable></Column>
        <Column field="country_name" header="Страна" sortable></Column>
        <Column field="oblast_okrug_name" header="Округ" sortable></Column>
        <Column field="region_name" header="Регион" sortable></Column>
        <Column field="income_id" header="ID Поставки" sortable></Column>
        <Column field="sale_id" header="ID Продажи" sortable></Column>
        <Column field="odid" header="ODID" sortable></Column>
        <Column field="spp" header="СПП" sortable></Column>
        <Column field="for_pay" header="К оплате" sortable></Column>
        <Column field="finished_price" header="Финальная цена" sortable></Column>
        <Column field="price_with_disc" header="Цена со скидкой" sortable></Column>
        <Column field="nm_id" header="ID Товара" sortable></Column>
        <Column field="subject" header="Предмет" sortable></Column>
        <Column field="category" header="Категория" sortable></Column>
        <Column field="brand" header="Бренд" sortable></Column>
        <Column field="is_storno" header="Сторно" sortable>
          <template #body="{ data }">
            {{ data.is_storno === null ? "—" : data.is_storno ? "Да" : "Нет" }}
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- График -->
    <div v-if="viewMode === 'chart' && !isFetching" class="bg-white shadow-md rounded-lg p-4 h-96">
      <Bar :data="chartData" :options="chartOptions" />
    </div>

    <!-- Пагинация -->
    <Paginator
        v-if="data?.meta"
        :rows="limit"
        :totalRecords="data.meta.total"
        :rowsPerPageOptions="[10, 20, 50]"
        @page="onPageChange"
        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    />
</template>