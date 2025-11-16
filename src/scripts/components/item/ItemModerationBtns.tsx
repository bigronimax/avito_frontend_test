import { approveItem, rejectItem, requestItemChanges } from "../../api/api";
import BaseModal from "../BaseModal";
import LightButton from "../LightButton";
import NavMenuLink from "../NavMenuLink";
import PrimaryButton from "../PrimaryButton";
import ReasonModal from "../ReasonModal";
import RedButton from "../RedButton";
import SubmitModal from "../SubmitModal";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

interface ItemModerationBtnsProps {
  id: number;
  idList: number[];
}

function ItemModerationBtns({ id, idList }: ItemModerationBtnsProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isApproveModalActive, setApproveModalActive] = useState(false);
  const [isRejectModalActive, setRejectModalActive] = useState(false);
  const [isRequestChangesModalActive, setRequestChangesModalActive] =
    useState(false);

  const currentIndex = idList.indexOf(id);
  const prevId = currentIndex > 0 ? idList[currentIndex - 1] : null;
  const nextId =
    currentIndex < idList.length - 1 ? idList[currentIndex + 1] : null;

  const getListURL = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("idList");

    const queryString = params.toString();
    return `/list${queryString ? `?${queryString}` : ""}`;
  };

  const getItemURL = (itemId: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("idList", idList.join(","));
    return `/item/${itemId}?${params.toString()}`;
  };

  const handleApprove = async () => {
    await approveItem({ id });
    setApproveModalActive(false);
    navigate(getListURL());
  };

  const handleReject = async (reason: string, comment: string = "") => {
    await rejectItem({ id, reason, comment });
    setRejectModalActive(false);
    navigate(getListURL());
  };

  const handleRequestItemChanges = async (
    reason: string,
    comment: string = "",
  ) => {
    await requestItemChanges({ id, reason, comment });
    setRequestChangesModalActive(false);
    navigate(getListURL());
  };

  return (
    <>
      <div className="flex flex-col gap-[25px]">
        <div className="flex gap-[25px]">
          <PrimaryButton
            onClickEvent={() => setApproveModalActive(true)}
            className="w-[20%]"
            text="Одобрить"
          />
          <RedButton
            onClickEvent={() => setRejectModalActive(true)}
            className="w-[20%]"
            text="Отклонить"
          />
          <LightButton
            onClickEvent={() => setRequestChangesModalActive(true)}
            className="w-[20%]"
            text="Доработка"
          />
        </div>
        <div className="flex gap-[20px]">
          <NavMenuLink text="Назад к списку" to={getListURL()} />
          <div className="flex gap-[20px]">
            {prevId && (
              <NavMenuLink text="< Предыдущее" to={getItemURL(prevId)} />
            )}
            {nextId && (
              <NavMenuLink text="Следующее >" to={getItemURL(nextId)} />
            )}
          </div>
        </div>
      </div>
      <BaseModal
        isActive={isApproveModalActive}
        setActive={setApproveModalActive}
        children={
          <SubmitModal
            title={"Вы одобряете это объявление?"}
            submitButtonText="Одобрить"
            denyButtonText="Назад"
            onSubmitClick={handleApprove}
            onDenyClick={() => setApproveModalActive(false)}
          />
        }
      ></BaseModal>
      <BaseModal
        isActive={isRejectModalActive}
        setActive={setRejectModalActive}
        children={
          <ReasonModal
            title={"Вы отклоняете это объявление?"}
            submitButtonText="Отклонить"
            denyButtonText="Назад"
            onSubmitClick={handleReject}
            onDenyClick={() => setRejectModalActive(false)}
          />
        }
      ></BaseModal>
      <BaseModal
        isActive={isRequestChangesModalActive}
        setActive={setRequestChangesModalActive}
        children={
          <ReasonModal
            title={"Отправить объявление на доработку?"}
            submitButtonText="Доработка"
            denyButtonText="Назад"
            onSubmitClick={handleRequestItemChanges}
            onDenyClick={() => setRequestChangesModalActive(false)}
          />
        }
      ></BaseModal>
    </>
  );
}

export default ItemModerationBtns;
