import { DatePicker, DatePickerValueChangeDetails, Portal } from "@ark-ui/react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

interface DatePickerCompProps {
  setDeadlineDate: (date: Date | null) => void;
  deadlineDate: Date | null;
}

export default function DatePickerComp({ setDeadlineDate, deadlineDate }: DatePickerCompProps) {
  const today = new Date();
  const availableDate = new Date(today);
  availableDate.setDate(today.getDate() + 1);
  const formattedDate = availableDate.toISOString().split("T")[0];

  const handleDateChange = (date: any) => {
    if (date?.valueAsString) {
      const dateString = date.valueAsString[0];
      const selected = new Date(dateString);

      setDeadlineDate(selected);
    }
  };

  return (
    <DatePicker.Root
      timeZone="UTC"
      onValueChange={(details: DatePickerValueChangeDetails) => handleDateChange(details)}
      min={formattedDate}
    >
      <DatePicker.Label className="text-sm font-semibold">Choose order delivery deadline</DatePicker.Label>
      <DatePicker.Control className="mt-1.5 flex items-center gap-2">
        <DatePicker.Input className="rounded-md border border-gray-300 p-2" />
        <DatePicker.Trigger>
          <Calendar size={25} />
        </DatePicker.Trigger>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content className="absolute -left-40 rounded-md bg-tertiary p-2 data-[scope=date-picker]:data-[part=content]:data-[state=closed]:animate-fadeOut data-[scope=date-picker]:data-[part=content]:data-[state=open]:animate-fadeIn">
            <div className="flex items-center justify-between gap-2">
              <DatePicker.YearSelect className="rounded-md p-1 text-sm" />
              <DatePicker.MonthSelect className="rounded-md p-1 text-sm" />
            </div>
            <DatePicker.View view="day">
              <DatePicker.Context>
                {(datePicker) => (
                  <>
                    <DatePicker.ViewControl className="flex items-center justify-between p-3">
                      <DatePicker.PrevTrigger>
                        <ChevronLeft />
                      </DatePicker.PrevTrigger>
                      <DatePicker.ViewTrigger className="text-sm">
                        <DatePicker.RangeText />
                      </DatePicker.ViewTrigger>
                      <DatePicker.NextTrigger>
                        <ChevronRight />
                      </DatePicker.NextTrigger>
                    </DatePicker.ViewControl>
                    <DatePicker.Table className="w-full">
                      <DatePicker.TableHead>
                        <DatePicker.TableRow>
                          {datePicker.weekDays.map((weekDay, id) => (
                            <DatePicker.TableHeader key={id}>{weekDay.short.slice(0, 1)}</DatePicker.TableHeader>
                          ))}
                        </DatePicker.TableRow>
                      </DatePicker.TableHead>
                      <DatePicker.TableBody>
                        {datePicker.weeks.map((week, id) => (
                          <DatePicker.TableRow key={id}>
                            {week.map((day, id) => (
                              <DatePicker.TableCell key={id} value={day}>
                                <DatePicker.TableCellTrigger
                                  className={`flex items-center justify-center p-2 text-sm ${
                                    new Date(day.year, day.month - 1, day.day).getTime() < today.getTime()
                                      ? "opacity-50"
                                      : ""
                                  }`}
                                >
                                  {day.day}
                                </DatePicker.TableCellTrigger>
                              </DatePicker.TableCell>
                            ))}
                          </DatePicker.TableRow>
                        ))}
                      </DatePicker.TableBody>
                    </DatePicker.Table>
                  </>
                )}
              </DatePicker.Context>
            </DatePicker.View>
            <DatePicker.View view="month">
              <DatePicker.Context>
                {(datePicker) => (
                  <>
                    <DatePicker.ViewControl className="flex items-center justify-between p-2 text-sm">
                      <DatePicker.PrevTrigger>
                        <ChevronLeft />
                      </DatePicker.PrevTrigger>
                      <DatePicker.ViewTrigger className="text-sm">
                        <DatePicker.RangeText />
                      </DatePicker.ViewTrigger>
                      <DatePicker.NextTrigger>
                        <ChevronRight />
                      </DatePicker.NextTrigger>
                    </DatePicker.ViewControl>
                    <DatePicker.Table className="w-full">
                      <DatePicker.TableBody>
                        {datePicker.getMonthsGrid({ columns: 4, format: "short" }).map((months, id) => (
                          <DatePicker.TableRow key={id}>
                            {months.map((month, id) => {
                              const isCurrentYear = datePicker.visibleRange.start.year === today.getFullYear();
                              const isPastMonth = isCurrentYear && month.value < today.getMonth() + 1;

                              return (
                                <DatePicker.TableCell key={id} value={month.value}>
                                  <DatePicker.TableCellTrigger
                                    className={`flex items-center justify-center p-2 text-sm ${
                                      isPastMonth ? "opacity-50" : ""
                                    }`}
                                  >
                                    {month.label}
                                  </DatePicker.TableCellTrigger>
                                </DatePicker.TableCell>
                              );
                            })}
                          </DatePicker.TableRow>
                        ))}
                      </DatePicker.TableBody>
                    </DatePicker.Table>
                  </>
                )}
              </DatePicker.Context>
            </DatePicker.View>
            <DatePicker.View view="year">
              <DatePicker.Context>
                {(datePicker) => (
                  <>
                    <DatePicker.ViewControl className="flex items-center justify-between p-2 text-sm">
                      <DatePicker.PrevTrigger>
                        <ChevronLeft />
                      </DatePicker.PrevTrigger>
                      <DatePicker.ViewTrigger className="text-sm">
                        <DatePicker.RangeText />
                      </DatePicker.ViewTrigger>
                      <DatePicker.NextTrigger>
                        <ChevronRight />
                      </DatePicker.NextTrigger>
                    </DatePicker.ViewControl>
                    <DatePicker.Table className="w-full">
                      <DatePicker.TableBody>
                        {datePicker.getYearsGrid({ columns: 4 }).map((years, id) => (
                          <DatePicker.TableRow key={id}>
                            {years.map((year, id) => {
                              const currentMonth = today.getFullYear();
                              const isPastYear = year.value < currentMonth;
                              return (
                                <DatePicker.TableCell key={id} value={year.value}>
                                  <DatePicker.TableCellTrigger
                                    className={`flex items-center justify-center p-2 text-sm ${
                                      isPastYear ? "opacity-50" : ""
                                    }`}
                                  >
                                    {year.label}
                                  </DatePicker.TableCellTrigger>
                                </DatePicker.TableCell>
                              );
                            })}
                          </DatePicker.TableRow>
                        ))}
                      </DatePicker.TableBody>
                    </DatePicker.Table>
                  </>
                )}
              </DatePicker.Context>
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  );
}
