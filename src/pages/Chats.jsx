import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMessageFromDB } from "../firebase";
import { nabila } from "../data";

export default function Chats() {
  const [messages, setMessages] = useState(false);

  const renderMessage = async () => {
    await getMessageFromDB("dialogue", (snapshot) => {
      let jsonString = snapshot.val();

      try {
        let msgArr = JSON.parse(jsonString);
        setMessages(msgArr);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    });
  };

  useEffect(() => {
    renderMessage();
  }, []);

  return messages ? (
    <div>
      <header>
        <nav className="bg-[#F6F6F6] px-[20px] flex justify-between h-[45px] items-center">
          <button className="text-[#007AFF]">Edit</button>
          <h2 className="font-semibold">Chats</h2>
          <button>
            <svg
              width="23"
              height="24"
              viewBox="0 0 23 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M21.0197 1.35147L20.9285 1.2691C20.4572 0.884673 19.7619 0.912132 19.3226 1.35147L18.1919 2.48214L20.6668 4.95701L21.7975 3.82635L21.8798 3.73521C22.2643 3.26388 22.2368 2.56863 21.7975 2.12929L21.0197 1.35147ZM17.7556 2.91701L18.4629 3.62399C18.4629 3.62399 10.417 11.6231 10.0228 12.0654C9.84995 12.2594 9.7998 12.5135 9.79798 12.7376C9.79528 13.0701 10.0656 13.3313 10.3981 13.3337C10.6326 13.3353 10.8974 13.2915 11.0835 13.1261C11.4958 12.7596 19.5235 4.68465 19.5235 4.68465L20.2305 5.39188L11.1157 14.5081C10.7378 14.886 9.94376 15.1126 8.73355 15.188L8.46785 15.2018H8.42556C8.18032 15.1914 7.98382 15.0061 7.95139 14.7712L7.94714 14.6811L7.96098 14.4154C8.03094 13.2916 8.23133 12.5267 8.56214 12.1206L8.64079 12.0333L17.7556 2.91701ZM14.757 4.15224L13.256 5.65224H2C1.72386 5.65224 1.5 5.8761 1.5 6.15224V21.1522C1.5 21.4284 1.72386 21.6522 2 21.6522H17C17.2761 21.6522 17.5 21.4284 17.5 21.1522V9.89424L19 8.39524V21.1522C19 22.2568 18.1046 23.1522 17 23.1522H2C0.89543 23.1522 0 22.2568 0 21.1522V6.15224C0 5.04767 0.89543 4.15224 2 4.15224H14.757Z"
                fill="#007AFF"
              />
            </svg>
          </button>
        </nav>
      </header>
      <main className="px-[20px]">
        <div className="flex justify-between text-[#8E8E93] py-2">
          <button>Broadcast Lists</button>
          <button>New Group</button>
        </div>
        <Link to="/prologue" className="flex h-[74px] items-center relative">
          <div className="absolute h-full right-0 flex justify-center flex-col">
            <button className="float-right">
              <svg
                width="7"
                height="12"
                viewBox="0 0 7 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.58579 6L0.292893 10.2929C-0.0976311 10.6834 -0.0976311 11.3166 0.292893 11.7071C0.683418 12.0976 1.31658 12.0976 1.70711 11.7071L6.70711 6.70711C7.09763 6.31658 7.09763 5.68342 6.70711 5.29289L1.70711 0.292893C1.31658 -0.0976311 0.683418 -0.0976311 0.292893 0.292893C-0.0976311 0.683418 -0.0976311 1.31658 0.292893 1.70711L4.58579 6Z"
                  fill="#3C3C43"
                  fill-opacity="0.3"
                />
              </svg>
            </button>
          </div>

          {/* image */}
          <div className="h-[52px] mr-[13px] w-[52px] bg-gray-400 rounded-full overflow-hidden">
            <img src={nabila.profilePicture} alt="" />
          </div>
          {/* info */}
          <div className="h-full flex flex-col justify-center">
            <div className="relative">
              <h2 className="font-bold">{nabila.name}</h2>
              <p className="absolute top-0 right-0 text-[#8E8E93]">
                {messages[messages.length - 1].date}
              </p>
            </div>
            <p className="text-[#8E8E93]">
              {messages[messages.length - 1].message.includes(
                "papone89823ksdfhhhduwie"
              ) ? (
                <p className="flex items-center w-[260px] gap-[3px]">
                  <svg
                    fill="#8E8E93"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 21h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2zm3-7 2.363 2.363L14 11l5 7H5l3-4z" />
                  </svg>
                  Foto
                </p>
              ) : (
                <p className="w-[260px]">
                  {messages[messages.length - 1].message.substring(0, 20)}...
                </p>
              )}
            </p>
          </div>
        </Link>
      </main>
      <footer className="fixed bottom-0 bg-[#F6F6F6] left-0 w-full border-t flex justify-between h-[65px] pt-1">
        <Link>
          <svg
            width="75"
            height="49"
            viewBox="0 0 75 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_0_9038)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M46.2682 10.4504C43.9125 8.03647 40.6907 6.6499 37.2488 6.6499C33.8081 6.6499 30.5863 8.03647 28.2306 10.4504C27.9991 10.6875 28.0038 11.0674 28.2409 11.2988C28.4781 11.5303 28.858 11.5256 29.0894 11.2885C31.2215 9.10367 34.1348 7.8499 37.2488 7.8499L37.5951 7.85505C40.5788 7.94405 43.3562 9.18459 45.4094 11.2885C45.6408 11.5256 46.0207 11.5303 46.2579 11.2988C46.495 11.0674 46.4996 10.6875 46.2682 10.4504ZM46.25 19.2499C46.25 14.2793 42.2206 10.2499 37.25 10.2499C32.2794 10.2499 28.25 14.2793 28.25 19.2499C28.25 24.2205 32.2794 28.2499 37.25 28.2499C42.2206 28.2499 46.25 24.2205 46.25 19.2499ZM25.1335 15.7816C25.2246 15.463 25.5567 15.2785 25.8753 15.3696C26.1939 15.4606 26.3784 15.7927 26.2873 16.1113C25.9983 17.1231 25.85 18.1763 25.85 19.2499C25.85 24.4611 29.3766 28.9713 34.3448 30.2765C34.6653 30.3607 34.8568 30.6888 34.7726 31.0093C34.6884 31.3298 34.3603 31.5214 34.0399 31.4372C28.5474 29.9942 24.65 25.0097 24.65 19.2499C24.65 18.0645 24.8139 16.9003 25.1335 15.7816ZM48.6393 15.4125C48.9582 15.3227 49.2896 15.5084 49.3794 15.8274C49.6906 16.9321 49.85 18.0807 49.85 19.2499C49.85 25.0507 45.8973 30.0612 40.3514 31.4652C40.0302 31.5465 39.7039 31.352 39.6225 31.0308C39.5412 30.7096 39.7357 30.3832 40.0569 30.3019C45.0734 29.0319 48.65 24.4982 48.65 19.2499C48.65 18.1909 48.5058 17.1518 48.2244 16.1527C48.1346 15.8337 48.3203 15.5023 48.6393 15.4125ZM37.25 11.4499C32.9422 11.4499 29.45 14.9421 29.45 19.2499C29.45 23.5577 32.9422 27.0499 37.25 27.0499C41.5578 27.0499 45.05 23.5577 45.05 19.2499C45.05 14.9421 41.5578 11.4499 37.25 11.4499Z"
                fill="#979797"
              />
              <path
                d="M22.2109 43.1201C22.2891 44.3701 23.3389 45.1709 24.9014 45.1709C26.5713 45.1709 27.6162 44.3311 27.6162 42.998C27.6162 41.9434 27.0205 41.3623 25.5752 41.0156L24.7988 40.8252C23.8809 40.6006 23.5098 40.3076 23.5098 39.7949C23.5098 39.1357 24.0859 38.7109 24.9502 38.7109C25.7705 38.7109 26.3369 39.1211 26.4395 39.79H27.5039C27.4404 38.6133 26.3955 37.7832 24.9648 37.7832C23.4268 37.7832 22.4014 38.6133 22.4014 39.8535C22.4014 40.8789 22.9824 41.4844 24.2568 41.792L25.165 42.0117C26.0977 42.2363 26.5078 42.5781 26.5078 43.1299C26.5078 43.7744 25.8633 44.2383 24.9844 44.2383C24.042 44.2383 23.3877 43.8037 23.2949 43.1201H22.2109ZM29.4057 38.3594V39.7119H28.5609V40.5518H29.4057V43.6035C29.4057 44.624 29.8695 45.0342 31.0365 45.0342C31.2416 45.0342 31.4369 45.0098 31.6078 44.9805V44.1455C31.4613 44.1602 31.3686 44.1699 31.2074 44.1699C30.685 44.1699 30.4555 43.9209 30.4555 43.3496V40.5518H31.6078V39.7119H30.4555V38.3594H29.4057ZM34.4129 45.0879C35.1111 45.0879 35.6922 44.7852 36.0096 44.248H36.0926V45H37.1033V41.3721C37.1033 40.2588 36.3514 39.5947 35.0184 39.5947C33.8123 39.5947 32.9529 40.1758 32.8455 41.0693H33.8611C33.9783 40.6836 34.3836 40.4639 34.9695 40.4639C35.6873 40.4639 36.0584 40.791 36.0584 41.3721V41.8359L34.618 41.9238C33.3533 42.002 32.6404 42.5537 32.6404 43.5059C32.6404 44.4727 33.3875 45.0879 34.4129 45.0879ZM34.6814 44.2432C34.1102 44.2432 33.6951 43.9551 33.6951 43.4619C33.6951 42.9785 34.0271 42.7197 34.7596 42.6709L36.0584 42.583V43.042C36.0584 43.7256 35.4725 44.2432 34.6814 44.2432ZM39.0686 38.3594V39.7119H38.2238V40.5518H39.0686V43.6035C39.0686 44.624 39.5324 45.0342 40.6994 45.0342C40.9045 45.0342 41.0998 45.0098 41.2707 44.9805V44.1455C41.1242 44.1602 41.0314 44.1699 40.8703 44.1699C40.3479 44.1699 40.1184 43.9209 40.1184 43.3496V40.5518H41.2707V39.7119H40.1184V38.3594H39.0686ZM47.0885 39.6973H46.0387V42.8076C46.0387 43.6621 45.5748 44.1797 44.7252 44.1797C43.9537 44.1797 43.607 43.7598 43.607 42.8809V39.6973H42.5572V43.1396C42.5572 44.3848 43.2115 45.1025 44.3883 45.1025C45.1939 45.1025 45.7359 44.7607 45.9947 44.1602H46.0777V45H47.0885V39.6973ZM48.5898 41.1816C48.5898 41.9678 49.0586 42.417 50.0693 42.6514L50.9971 42.8711C51.5293 42.998 51.7783 43.2129 51.7783 43.5449C51.7783 43.9795 51.3145 44.2822 50.6602 44.2822C50.0254 44.2822 49.6348 44.0234 49.5029 43.6084H48.4531C48.5459 44.5312 49.3711 45.1025 50.6357 45.1025C51.9053 45.1025 52.8379 44.4336 52.8379 43.4473C52.8379 42.6758 52.3643 42.2412 51.3535 42.0068L50.4697 41.8018C49.8936 41.665 49.625 41.46 49.625 41.1328C49.625 40.7031 50.0693 40.415 50.6553 40.415C51.251 40.415 51.6318 40.6738 51.7295 41.0693H52.7354C52.6328 40.1514 51.8516 39.5947 50.6553 39.5947C49.4541 39.5947 48.5898 40.2588 48.5898 41.1816Z"
                fill="#545458"
                fill-opacity="0.65"
              />
            </g>
            <defs>
              <clipPath id="clip0_0_9038">
                <rect width="75" height="49" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Link>
        <Link>
          <svg
            width="75"
            height="49"
            viewBox="0 0 75 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_0_9031)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M47.38 27.7505C47.6059 27.5439 47.7999 27.305 47.9558 27.0415C48.8277 25.568 48.3399 23.6667 46.8664 22.7949L43.5578 20.8373L43.3933 20.7478C42.6143 20.3595 41.6873 20.3855 40.9276 20.8269L39.8967 21.4259L39.7769 21.4881C39.2495 21.7303 38.6203 21.6224 38.2033 21.2054L34.1243 17.1264L34.0336 17.0266C33.6644 16.5788 33.6075 15.943 33.9038 15.4331L34.5028 14.4022C34.9758 13.5882 34.9718 12.5822 34.4924 11.772L32.5348 8.46333C31.663 6.98984 29.7618 6.50209 28.2883 7.37391C28.0248 7.52981 27.7859 7.72386 27.5793 7.94977C26.1088 9.55758 25.4506 11.0884 25.6671 12.54C26.1106 15.5148 28.202 18.9126 31.9177 22.7701L32.2404 23.0889L32.5597 23.412L32.5659 23.4074C36.4172 27.1277 39.815 29.2191 42.7898 29.6627C44.2413 29.8791 45.7722 29.2209 47.38 27.7505ZM46.5701 26.865C45.1895 28.1276 43.9952 28.6292 42.9667 28.4758C40.3822 28.0905 37.3066 26.2445 33.7563 22.8853L33.1713 22.3237L32.7611 21.9164C29.2076 18.2268 27.2519 15.0318 26.8539 12.363C26.7006 11.3346 27.2021 10.1402 28.4648 8.75963C28.5914 8.62117 28.7378 8.50223 28.8993 8.40668C29.8024 7.87234 30.9677 8.17128 31.5021 9.07439L33.4597 12.383C33.7178 12.8193 33.7199 13.361 33.4653 13.7993L32.8662 14.8302C32.3189 15.7722 32.4178 16.9532 33.1078 17.7899L33.2362 17.9334L37.3548 22.0539C38.1252 22.8243 39.2921 23.0312 40.2777 22.5786L40.4492 22.4912L41.5305 21.8645C41.9382 21.6276 42.4374 21.6121 42.858 21.8218L42.9842 21.8913L46.2554 23.8277C47.1585 24.362 47.4574 25.5273 46.9231 26.4304C46.8275 26.5919 46.7086 26.7383 46.5701 26.865Z"
                fill="#545458"
                fill-opacity="0.65"
              />
              <path
                d="M29.2482 45.1709C30.8205 45.1709 31.9777 44.2676 32.173 42.8955H31.0842C30.8889 43.6963 30.1809 44.1992 29.2482 44.1992C27.9787 44.1992 27.1877 43.1543 27.1877 41.4795C27.1877 39.8047 27.9787 38.7549 29.2434 38.7549C30.1711 38.7549 30.8791 39.3115 31.0842 40.1855H32.173C31.9973 38.7744 30.7961 37.7832 29.2434 37.7832C27.2854 37.7832 26.0695 39.1992 26.0695 41.4795C26.0695 43.7549 27.2902 45.1709 29.2482 45.1709ZM35.0611 45.0879C35.7594 45.0879 36.3404 44.7852 36.6578 44.248H36.7408V45H37.7516V41.3721C37.7516 40.2588 36.9996 39.5947 35.6666 39.5947C34.4605 39.5947 33.6012 40.1758 33.4938 41.0693H34.5094C34.6266 40.6836 35.0318 40.4639 35.6178 40.4639C36.3355 40.4639 36.7066 40.791 36.7066 41.3721V41.8359L35.2662 41.9238C34.0016 42.002 33.2887 42.5537 33.2887 43.5059C33.2887 44.4727 34.0357 45.0879 35.0611 45.0879ZM35.3297 44.2432C34.7584 44.2432 34.3434 43.9551 34.3434 43.4619C34.3434 42.9785 34.6754 42.7197 35.4078 42.6709L36.7066 42.583V43.042C36.7066 43.7256 36.1207 44.2432 35.3297 44.2432ZM39.3945 45H40.4443V37.6172H39.3945V45ZM42.1703 45H43.2201V37.6172H42.1703V45ZM44.7752 41.1816C44.7752 41.9678 45.2439 42.417 46.2547 42.6514L47.1824 42.8711C47.7146 42.998 47.9637 43.2129 47.9637 43.5449C47.9637 43.9795 47.4998 44.2822 46.8455 44.2822C46.2107 44.2822 45.8201 44.0234 45.6883 43.6084H44.6385C44.7313 44.5312 45.5564 45.1025 46.8211 45.1025C48.0906 45.1025 49.0232 44.4336 49.0232 43.4473C49.0232 42.6758 48.5496 42.2412 47.5389 42.0068L46.6551 41.8018C46.0789 41.665 45.8104 41.46 45.8104 41.1328C45.8104 40.7031 46.2547 40.415 46.8406 40.415C47.4363 40.415 47.8172 40.6738 47.9148 41.0693H48.9207C48.8182 40.1514 48.0369 39.5947 46.8406 39.5947C45.6395 39.5947 44.7752 40.2588 44.7752 41.1816Z"
                fill="#545458"
                fill-opacity="0.65"
              />
            </g>
            <defs>
              <clipPath id="clip0_0_9031">
                <rect width="75" height="49" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Link>
        <Link>
          <svg
            width="75"
            height="49"
            viewBox="0 0 75 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_0_9022)">
              <path
                d="M22.3965 45.1709C23.9688 45.1709 25.126 44.2676 25.3213 42.8955H24.2324C24.0371 43.6963 23.3291 44.1992 22.3965 44.1992C21.127 44.1992 20.3359 43.1543 20.3359 41.4795C20.3359 39.8047 21.127 38.7549 22.3916 38.7549C23.3193 38.7549 24.0273 39.3115 24.2324 40.1855H25.3213C25.1455 38.7744 23.9443 37.7832 22.3916 37.7832C20.4336 37.7832 19.2178 39.1992 19.2178 41.4795C19.2178 43.7549 20.4385 45.1709 22.3965 45.1709ZM28.2094 45.0879C28.9076 45.0879 29.4887 44.7852 29.8061 44.248H29.8891V45H30.8998V41.3721C30.8998 40.2588 30.1479 39.5947 28.8148 39.5947C27.6088 39.5947 26.7494 40.1758 26.642 41.0693H27.6576C27.7748 40.6836 28.1801 40.4639 28.766 40.4639C29.4838 40.4639 29.8549 40.791 29.8549 41.3721V41.8359L28.4145 41.9238C27.1498 42.002 26.4369 42.5537 26.4369 43.5059C26.4369 44.4727 27.184 45.0879 28.2094 45.0879ZM28.4779 44.2432C27.9066 44.2432 27.4916 43.9551 27.4916 43.4619C27.4916 42.9785 27.8236 42.7197 28.5561 42.6709L29.8549 42.583V43.042C29.8549 43.7256 29.2689 44.2432 28.4779 44.2432ZM32.4939 45H33.5437V41.7432C33.5437 41.0498 34.0271 40.5078 34.6668 40.5078C35.2918 40.5078 35.6922 40.8838 35.6922 41.4893V45H36.7225V41.6455C36.7225 41.0059 37.1668 40.5078 37.8455 40.5078C38.534 40.5078 38.8758 40.8643 38.8758 41.5967V45H39.9256V41.3428C39.9256 40.2393 39.3006 39.5947 38.2264 39.5947C37.4891 39.5947 36.8787 39.9707 36.6102 40.542H36.5271C36.2928 39.9707 35.7898 39.5947 35.0623 39.5947C34.3543 39.5947 33.8172 39.9463 33.5828 40.542H33.5047V39.6973H32.4939V45ZM44.9865 43.5791C44.7912 44.0088 44.3566 44.2432 43.7219 44.2432C42.882 44.2432 42.34 43.6377 42.3059 42.6758V42.627H46.0607V42.2656C46.0607 40.6055 45.1672 39.5947 43.6877 39.5947C42.1887 39.5947 41.2365 40.6738 41.2365 42.3584C41.2365 44.0527 42.1691 45.1025 43.6926 45.1025C44.9084 45.1025 45.7678 44.5166 45.9973 43.5791H44.9865ZM43.6828 40.4492C44.4592 40.4492 44.967 41.0107 44.9914 41.8701H42.3059C42.3645 41.0156 42.9064 40.4492 43.6828 40.4492ZM47.4205 45H48.4703V41.8311C48.4703 41.084 49.0318 40.5713 49.8277 40.5713C50.0133 40.5713 50.3258 40.6055 50.4137 40.6299V39.6436C50.3014 39.6191 50.1012 39.6045 49.9449 39.6045C49.2516 39.6045 48.6607 39.9805 48.5094 40.5029H48.4312V39.6973H47.4205V45ZM52.9551 45.0879C53.6533 45.0879 54.2344 44.7852 54.5518 44.248H54.6348V45H55.6455V41.3721C55.6455 40.2588 54.8936 39.5947 53.5605 39.5947C52.3545 39.5947 51.4951 40.1758 51.3877 41.0693H52.4033C52.5205 40.6836 52.9258 40.4639 53.5117 40.4639C54.2295 40.4639 54.6006 40.791 54.6006 41.3721V41.8359L53.1602 41.9238C51.8955 42.002 51.1826 42.5537 51.1826 43.5059C51.1826 44.4727 51.9297 45.0879 52.9551 45.0879ZM53.2236 44.2432C52.6523 44.2432 52.2373 43.9551 52.2373 43.4619C52.2373 42.9785 52.5693 42.7197 53.3018 42.6709L54.6006 42.583V43.042C54.6006 43.7256 54.0146 44.2432 53.2236 44.2432Z"
                fill="#545458"
                fill-opacity="0.65"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M41.3562 8.52205C40.805 8.02507 40.0893 7.75 39.3471 7.75H35.2825C34.5406 7.75 33.825 8.02493 33.2739 8.52168L32.4762 9.24079C31.934 9.72952 31.2299 10 30.5 10C27.1863 10 24.5 12.6863 24.5 16V23.5C24.5 26.8137 27.1863 29.5 30.5 29.5H44C47.3137 29.5 50 26.8137 50 23.5V16C50 12.6863 47.3137 10 44 10L43.7854 9.99118C43.2163 9.94433 42.6759 9.71212 42.2489 9.32708L41.3562 8.52205ZM35.2825 8.95H39.3471C39.7924 8.95 40.2219 9.11504 40.5526 9.41323L41.4453 10.2183C42.0667 10.7786 42.8545 11.1186 43.687 11.1871L43.9507 11.199C46.651 11.2 48.8 13.349 48.8 16V23.5C48.8 26.151 46.651 28.3 44 28.3H30.5C27.849 28.3 25.7 26.151 25.7 23.5V16C25.7 13.4207 27.7344 11.3165 30.2862 11.2047L30.7362 11.1933C31.6777 11.1397 32.5757 10.7667 33.2796 10.1321L34.0774 9.41301C34.408 9.11496 34.8374 8.95 35.2825 8.95ZM37.25 13C40.4256 13 43 15.5744 43 18.75C43 21.9256 40.4256 24.5 37.25 24.5C34.0744 24.5 31.5 21.9256 31.5 18.75C31.5 15.5744 34.0744 13 37.25 13ZM32.7 18.75C32.7 16.2371 34.7371 14.2 37.25 14.2C39.7629 14.2 41.8 16.2371 41.8 18.75C41.8 21.2629 39.7629 23.3 37.25 23.3C34.7371 23.3 32.7 21.2629 32.7 18.75Z"
                fill="#545458"
                fill-opacity="0.65"
              />
            </g>
            <defs>
              <clipPath id="clip0_0_9022">
                <rect width="75" height="49" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Link>
        <Link>
          <svg
            width="75"
            height="49"
            viewBox="0 0 75 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_0_9016)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M34 9C40.6274 9 46 13.2526 46 18.4985C46 23.7444 39.6406 27.8634 32.3681 27.3883C29.7092 30.1085 26.6678 30.0465 26.512 29.8586C26.3562 29.6707 26.7425 29.5054 27.3814 28.5059C28.0204 27.5064 28.0204 26.4176 26.783 25.6474L26.7034 25.6027L26.6217 25.5619C23.5406 24.1153 22 21.7609 22 18.4985C22 12.6538 27.3726 9 34 9ZM41.7804 9.50228C48.0021 9.60349 53 13.0728 53 18.5738C53 21.5898 51.6173 23.7935 48.852 25.1849L48.4926 25.3604L48.4163 25.4031C47.2305 26.1389 47.2305 27.1789 47.8428 28.1338C48.4551 29.0886 48.8253 29.2465 48.676 29.426C48.5267 29.6055 45.612 29.6647 43.0639 27.0662C42.5147 27.1019 41.971 27.1104 41.4353 27.0933C45.0637 25.2416 47.5 22.1378 47.5 18.4985C47.5 14.9283 45.4481 11.8027 42.2847 9.80517L41.9941 9.62671L41.7804 9.50228Z"
                fill="#007AFF"
              />
              <path
                d="M27.007 45.1709C28.5793 45.1709 29.7365 44.2676 29.9318 42.8955H28.843C28.6477 43.6963 27.9396 44.1992 27.007 44.1992C25.7375 44.1992 24.9465 43.1543 24.9465 41.4795C24.9465 39.8047 25.7375 38.7549 27.0021 38.7549C27.9299 38.7549 28.6379 39.3115 28.843 40.1855H29.9318C29.7561 38.7744 28.5549 37.7832 27.0021 37.7832C25.0441 37.7832 23.8283 39.1992 23.8283 41.4795C23.8283 43.7549 25.049 45.1709 27.007 45.1709ZM31.399 45H32.4488V41.8945C32.4488 41.0645 32.9273 40.5127 33.7867 40.5127C34.5289 40.5127 34.9244 40.9473 34.9244 41.8213V45H35.9742V41.5723C35.9742 40.3174 35.276 39.5996 34.1432 39.5996C33.3424 39.5996 32.7809 39.9512 32.5221 40.542H32.4391V37.6172H31.399V45ZM39.0234 45.0879C39.7217 45.0879 40.3027 44.7852 40.6201 44.248H40.7031V45H41.7139V41.3721C41.7139 40.2588 40.9619 39.5947 39.6289 39.5947C38.4229 39.5947 37.5635 40.1758 37.4561 41.0693H38.4717C38.5889 40.6836 38.9941 40.4639 39.5801 40.4639C40.2979 40.4639 40.6689 40.791 40.6689 41.3721V41.8359L39.2285 41.9238C37.9639 42.002 37.251 42.5537 37.251 43.5059C37.251 44.4727 37.998 45.0879 39.0234 45.0879ZM39.292 44.2432C38.7207 44.2432 38.3057 43.9551 38.3057 43.4619C38.3057 42.9785 38.6377 42.7197 39.3701 42.6709L40.6689 42.583V43.042C40.6689 43.7256 40.083 44.2432 39.292 44.2432ZM43.6791 38.3594V39.7119H42.8344V40.5518H43.6791V43.6035C43.6791 44.624 44.143 45.0342 45.31 45.0342C45.515 45.0342 45.7104 45.0098 45.8812 44.9805V44.1455C45.7348 44.1602 45.642 44.1699 45.4809 44.1699C44.9584 44.1699 44.7289 43.9209 44.7289 43.3496V40.5518H45.8812V39.7119H44.7289V38.3594H43.6791ZM47.0164 41.1816C47.0164 41.9678 47.4852 42.417 48.4959 42.6514L49.4236 42.8711C49.9559 42.998 50.2049 43.2129 50.2049 43.5449C50.2049 43.9795 49.741 44.2822 49.0867 44.2822C48.452 44.2822 48.0613 44.0234 47.9295 43.6084H46.8797C46.9725 44.5312 47.7977 45.1025 49.0623 45.1025C50.3318 45.1025 51.2645 44.4336 51.2645 43.4473C51.2645 42.6758 50.7908 42.2412 49.7801 42.0068L48.8963 41.8018C48.3201 41.665 48.0516 41.46 48.0516 41.1328C48.0516 40.7031 48.4959 40.415 49.0818 40.415C49.6775 40.415 50.0584 40.6738 50.1561 41.0693H51.1619C51.0594 40.1514 50.2781 39.5947 49.0818 39.5947C47.8807 39.5947 47.0164 40.2588 47.0164 41.1816Z"
                fill="#007AFF"
              />
            </g>
            <defs>
              <clipPath id="clip0_0_9016">
                <rect width="75" height="49" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Link>
        <Link>
          <svg
            width="75"
            height="49"
            viewBox="0 0 75 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_0_9006)">
              <path
                d="M17.609 43.1201C17.6871 44.3701 18.7369 45.1709 20.2994 45.1709C21.9693 45.1709 23.0143 44.3311 23.0143 42.998C23.0143 41.9434 22.4186 41.3623 20.9732 41.0156L20.1969 40.8252C19.2789 40.6006 18.9078 40.3076 18.9078 39.7949C18.9078 39.1357 19.484 38.7109 20.3482 38.7109C21.1686 38.7109 21.735 39.1211 21.8375 39.79H22.902C22.8385 38.6133 21.7936 37.7832 20.3629 37.7832C18.8248 37.7832 17.7994 38.6133 17.7994 39.8535C17.7994 40.8789 18.3805 41.4844 19.6549 41.792L20.5631 42.0117C21.4957 42.2363 21.9059 42.5781 21.9059 43.1299C21.9059 43.7744 21.2613 44.2383 20.3824 44.2383C19.44 44.2383 18.7857 43.8037 18.693 43.1201H17.609ZM27.9189 43.5791C27.7236 44.0088 27.2891 44.2432 26.6543 44.2432C25.8145 44.2432 25.2725 43.6377 25.2383 42.6758V42.627H28.9932V42.2656C28.9932 40.6055 28.0996 39.5947 26.6201 39.5947C25.1211 39.5947 24.1689 40.6738 24.1689 42.3584C24.1689 44.0527 25.1016 45.1025 26.625 45.1025C27.8408 45.1025 28.7002 44.5166 28.9297 43.5791H27.9189ZM26.6152 40.4492C27.3916 40.4492 27.8994 41.0107 27.9238 41.8701H25.2383C25.2969 41.0156 25.8389 40.4492 26.6152 40.4492ZM30.724 38.3594V39.7119H29.8793V40.5518H30.724V43.6035C30.724 44.624 31.1879 45.0342 32.3549 45.0342C32.56 45.0342 32.7553 45.0098 32.9262 44.9805V44.1455C32.7797 44.1602 32.6869 44.1699 32.5258 44.1699C32.0033 44.1699 31.7738 43.9209 31.7738 43.3496V40.5518H32.9262V39.7119H31.7738V38.3594H30.724ZM34.6521 38.3594V39.7119H33.8074V40.5518H34.6521V43.6035C34.6521 44.624 35.116 45.0342 36.283 45.0342C36.4881 45.0342 36.6834 45.0098 36.8543 44.9805V44.1455C36.7078 44.1602 36.615 44.1699 36.4539 44.1699C35.9314 44.1699 35.702 43.9209 35.702 43.3496V40.5518H36.8543V39.7119H35.702V38.3594H34.6521ZM38.7316 38.75C39.0979 38.75 39.3957 38.4521 39.3957 38.0908C39.3957 37.7246 39.0979 37.4268 38.7316 37.4268C38.3654 37.4268 38.0676 37.7246 38.0676 38.0908C38.0676 38.4521 38.3654 38.75 38.7316 38.75ZM38.2092 45H39.2541V39.6973H38.2092V45ZM40.8971 45H41.9469V41.8896C41.9469 41.0352 42.44 40.5078 43.2164 40.5078C43.9928 40.5078 44.3639 40.9375 44.3639 41.8164V45H45.4137V41.5674C45.4137 40.3027 44.7594 39.5947 43.5729 39.5947C42.7721 39.5947 42.2447 39.9512 41.9859 40.5371H41.9078V39.6973H40.8971V45ZM49.2344 47.0264C50.7383 47.0264 51.6904 46.2598 51.6904 45.0537V39.6973H50.6846V40.542H50.6016C50.3037 39.9658 49.6641 39.6045 48.9316 39.6045C47.5742 39.6045 46.7246 40.6738 46.7246 42.2803C46.7246 43.8721 47.5645 44.9219 48.9219 44.9219C49.6543 44.9219 50.2402 44.6045 50.5625 44.0283H50.6406V45.0488C50.6406 45.7666 50.123 46.1963 49.249 46.1963C48.541 46.1963 48.0967 45.9424 48.0088 45.542H46.9346C47.0469 46.4355 47.9062 47.0264 49.2344 47.0264ZM49.2197 44.0527C48.3164 44.0527 47.8086 43.3643 47.8086 42.2803C47.8086 41.1963 48.3164 40.5029 49.2197 40.5029C50.1133 40.5029 50.6602 41.1963 50.6602 42.2803C50.6602 43.3643 50.1182 44.0527 49.2197 44.0527ZM53.1918 41.1816C53.1918 41.9678 53.6605 42.417 54.6713 42.6514L55.599 42.8711C56.1312 42.998 56.3803 43.2129 56.3803 43.5449C56.3803 43.9795 55.9164 44.2822 55.2621 44.2822C54.6273 44.2822 54.2367 44.0234 54.1049 43.6084H53.0551C53.1479 44.5312 53.973 45.1025 55.2377 45.1025C56.5072 45.1025 57.4398 44.4336 57.4398 43.4473C57.4398 42.6758 56.9662 42.2412 55.9555 42.0068L55.0717 41.8018C54.4955 41.665 54.227 41.46 54.227 41.1328C54.227 40.7031 54.6713 40.415 55.2572 40.415C55.8529 40.415 56.2338 40.6738 56.3314 41.0693H57.3373C57.2348 40.1514 56.4535 39.5947 55.2572 39.5947C54.0561 39.5947 53.1918 40.2588 53.1918 41.1816Z"
                fill="#545458"
                fill-opacity="0.65"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M46.0444 11.5512L45.938 11.429L46.4509 11.0804L46.5325 10.9841C46.7621 10.654 46.7255 10.2235 46.451 9.94898C46.1385 9.63656 45.632 9.63656 45.3196 9.94898L44.788 10.276L44.6485 10.1546C44.0511 9.65546 43.4 9.21863 42.7051 8.85447L42.523 8.76295L42.7326 8.22768L42.7691 8.11995C42.8661 7.72586 42.6711 7.33245 42.3088 7.17868C41.9021 7.00604 41.4325 7.19579 41.2598 7.6025L41.039 8.14995L40.8842 8.0986C40.1514 7.86967 39.3858 7.71541 38.5964 7.6452L38.393 7.63095L38.4 7L38.3915 6.88654C38.3268 6.48587 37.9935 6.19995 37.6 6.19995C37.1582 6.19995 36.8 6.55812 36.8 6.99995V7.62995L36.6021 7.6446C35.8105 7.71579 35.0431 7.87087 34.3097 8.10089L34.129 8.15995L33.9536 7.61207L33.9032 7.51009C33.6931 7.16283 33.277 7.02257 32.9121 7.17C32.5025 7.33551 32.3046 7.80177 32.4701 8.21143L32.658 8.77095L32.489 8.8569C31.796 9.22119 31.1467 9.6573 30.5513 10.1556L30.416 10.272L29.9804 9.84902L29.8841 9.7675C29.554 9.53782 29.1236 9.57442 28.849 9.84898C28.5366 10.1614 28.5366 10.6679 28.849 10.9804L29.284 11.402L29.1546 11.5514C28.6555 12.1488 28.2187 12.8 27.8545 13.4948L27.765 13.671L27.2277 13.4673L27.12 13.4308C26.7259 13.3338 26.3325 13.5289 26.1787 13.8911C26.0061 14.2978 26.1958 14.7675 26.6025 14.9401L27.153 15.15L27.0987 15.3156C26.8509 16.1088 26.6905 16.9406 26.6296 17.8H26L25.8866 17.8085C25.4859 17.8731 25.2 18.2064 25.2 18.6C25.2 19.0418 25.5582 19.4 26 19.4L26.63 19.399L26.6445 19.5958C26.7153 20.3856 26.8697 21.1512 27.0986 21.8829L27.154 22.05L26.6026 22.2597L26.5015 22.3119C26.1579 22.528 26.025 22.9465 26.1787 23.3088C26.3514 23.7155 26.821 23.9052 27.2277 23.7326L27.765 23.528L27.8538 23.7049C28.2186 24.3999 28.6556 25.051 29.155 25.6479L29.278 25.789L28.8491 26.2195L28.7675 26.3158C28.5379 26.6459 28.5745 27.0764 28.849 27.3509C29.1614 27.6633 29.668 27.6633 29.9804 27.3509L30.408 26.921L30.5515 27.0453C31.1489 27.5444 31.8 27.9813 32.4949 28.3454L32.678 28.437L32.4674 28.9722L32.4309 29.0799C32.3339 29.474 32.5289 29.8675 32.8912 30.0212C33.2979 30.1939 33.7675 30.0041 33.9402 29.5974L34.157 29.048L34.3156 29.1013C35.0482 29.3301 35.8137 29.4845 36.6034 29.5552L36.8 29.569V30.1999L36.8085 30.3134C36.8732 30.714 37.2065 31 37.6 31C38.0418 31 38.4 30.6418 38.4 30.2L38.399 29.569L38.597 29.5554C39.3889 29.4842 40.1566 29.3291 40.8902 29.0991L41.065 29.04L41.2464 29.5878L41.2968 29.6898C41.5068 30.0371 41.923 30.1773 42.2878 30.0299C42.6975 29.8644 42.8954 29.3981 42.7299 28.9885L42.537 28.43L42.711 28.343C43.404 27.9787 44.0533 27.5426 44.6487 27.0443L44.783 26.927L45.2196 27.3509L45.3159 27.4324C45.646 27.6621 46.0764 27.6255 46.351 27.3509C46.6634 27.0385 46.6634 26.532 46.351 26.2195L45.915 25.798L46.0454 25.6485C46.5445 25.0511 46.9813 24.3999 47.3455 23.7051L47.429 23.537L47.9723 23.7326L48.08 23.7691C48.4741 23.8661 48.8675 23.671 49.0213 23.3088C49.1939 22.9021 49.0042 22.4324 48.5974 22.2598L48.044 22.054L48.0477 22.0512C48.3063 21.268 48.4792 20.4459 48.5553 19.5963L48.569 19.399L49.2 19.4L49.3134 19.3914C49.7141 19.3268 50 18.9935 50 18.6C50 18.1581 49.6418 17.8 49.2 17.8L48.569 17.799L48.5553 17.6021C48.4842 16.8104 48.3291 16.043 48.0991 15.3097L48.048 15.156L48.5879 14.9535L48.6899 14.9032C49.0371 14.6931 49.1774 14.277 49.03 13.9121C48.8644 13.5024 48.3982 13.3045 47.9885 13.47L47.431 13.663L47.343 13.489C46.9788 12.796 46.5426 12.1467 46.0444 11.5512ZM37.6 8.79995C36.0289 8.79995 34.5442 9.16964 33.2281 9.82678L35.3852 13.5641C36.0628 13.2656 36.8121 13.1 37.6 13.1C40.4345 13.1 42.7682 15.2442 43.0676 17.9991H47.3819C47.0715 12.8666 42.8106 8.79995 37.6 8.79995ZM32.1891 10.4279C29.5439 12.1828 27.8 15.1877 27.8 18.6C27.8 22.0122 29.5439 25.0171 32.1891 26.772L34.3472 23.0354C32.9845 22.0343 32.1 20.4204 32.1 18.6C32.1 16.7795 32.9845 15.1656 34.3472 14.1645L32.1891 10.4279ZM47.3819 19.1998H43.0677C42.7688 21.9552 40.4349 24.1 37.6 24.1C36.8121 24.1 36.0628 23.9343 35.3852 23.6358L33.2281 27.3731C34.5442 28.0303 36.0289 28.4 37.6 28.4C42.811 28.4 47.072 24.3328 47.3819 19.1998ZM33.3 18.6C33.3 16.2251 35.2252 14.3 37.6 14.3C39.9748 14.3 41.9 16.2251 41.9 18.6C41.9 20.9748 39.9748 22.9 37.6 22.9C35.2252 22.9 33.3 20.9748 33.3 18.6Z"
                fill="#545458"
                fill-opacity="0.65"
              />
            </g>
            <defs>
              <clipPath id="clip0_0_9006">
                <rect width="75" height="49" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Link>
      </footer>
    </div>
  ) : (
    <></>
  );
}
